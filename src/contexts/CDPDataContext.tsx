import React, { createContext, useContext, useState, ReactNode } from 'react';

// --- Types for CDP Data ---
export interface CustomerProfile {
    id: string;
    phone: string;
    lineUid?: string;
    name: string;
    tier: 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';
    totalSpent: number;
    visitCount: number;
    averageSpending: number;
    lastVisit: string;
    favoriteTable?: string;
    segments: string[];
    pdpaConsent: {
        marketingAds: boolean;
        dataAnalysis: boolean;
        acceptedAt: string;
    };
}

export interface TransactionRecord {
    id: string;
    source: 'POS';
    customerId?: string; // Links to CustomerProfile.id
    phoneProvided?: string; // In case phone is provided at POS
    tableNumber: string;
    items: string[];
    totalAmount: number;
    timestamp: string;
}

// --- Mock Initial Data ---
const initialCustomers: CustomerProfile[] = [
    {
        id: 'c1',
        phone: '086-360-5383',
        lineUid: 'U1234567890abcdef',
        name: 'Chayamon Naticharat',
        tier: 'GOLD',
        totalSpent: 23042,
        visitCount: 5,
        averageSpending: 4608,
        lastVisit: new Date().toISOString(),
        favoriteTable: 'T2',
        segments: ['VIP', 'Big Spender', 'Dine-in Lover'],
        pdpaConsent: {
            marketingAds: true,
            dataAnalysis: true,
            acceptedAt: new Date().toISOString(),
        }
    },
    {
        id: 'c2',
        phone: '081-234-5678',
        name: 'John Doe',
        tier: 'SILVER',
        totalSpent: 1250,
        visitCount: 1,
        averageSpending: 1250,
        lastVisit: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days ago
        favoriteTable: 'T5',
        segments: ['Churn Risk'],
        pdpaConsent: {
            marketingAds: false,
            dataAnalysis: true,
            acceptedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
        }
    }
];

const initialTransactions: TransactionRecord[] = [
    {
        id: 'tx1',
        source: 'POS',
        customerId: 'c1',
        tableNumber: 'T2',
        items: ['Salmon Sashimi', 'Tuna Nigiri'],
        totalAmount: 1450,
        timestamp: new Date().toISOString()
    }
];

// --- Context Definition ---
interface CDPContextType {
    customers: CustomerProfile[];
    transactions: TransactionRecord[];

    // Methods to interact with data
    addTransaction: (tx: Omit<TransactionRecord, 'id' | 'timestamp'>) => void;
    updateCustomerSegments: (customerId: string, newSegments: string[]) => void;
    registerLineAccount: (phone: string, lineUid: string, name: string) => void;
    updateConsent: (customerId: string, marketingAds: boolean, dataAnalysis: boolean) => void;
}

const CDPDataContext = createContext<CDPContextType | undefined>(undefined);

export const CDPDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [customers, setCustomers] = useState<CustomerProfile[]>(initialCustomers);
    const [transactions, setTransactions] = useState<TransactionRecord[]>(initialTransactions);

    // Core Identity Resolution Logic
    const handleIdentityResolution = (phone: string | undefined): CustomerProfile | undefined => {
        if (!phone) return undefined;

        // Find existing customer by phone
        return customers.find(c => c.phone === phone);
    };

    const addTransaction = (txData: Omit<TransactionRecord, 'id' | 'timestamp'>) => {
        const newTx: TransactionRecord = {
            ...txData,
            id: `tx-${Date.now()}`,
            timestamp: new Date().toISOString()
        };

        setTransactions(prev => [newTx, ...prev]);

        // Handle Identity Resolution and update profile
        const existingCustomer = handleIdentityResolution(txData.phoneProvided);

        if (existingCustomer) {
            // Link transaction to found customer
            newTx.customerId = existingCustomer.id;

            // Update customer profile stats
            setCustomers(prev => prev.map(c => {
                if (c.id === existingCustomer.id) {
                    const newTotal = c.totalSpent + txData.totalAmount;
                    const newVisitCount = c.visitCount + 1;

                    return {
                        ...c,
                        totalSpent: newTotal,
                        visitCount: newVisitCount,
                        averageSpending: Math.round(newTotal / newVisitCount),
                        lastVisit: newTx.timestamp,
                        // Auto-update tier simply based on spending
                        tier: newTotal >= 20000 ? 'DIAMOND' : newTotal >= 10000 ? 'PLATINUM' : newTotal >= 5000 ? 'GOLD' : 'SILVER'
                    };
                }
                return c;
            }));
        } else if (txData.phoneProvided) {
            // Auto-create basic profile if phone is provided but not found
            const newCustomer: CustomerProfile = {
                id: `c-${Date.now()}`,
                phone: txData.phoneProvided,
                name: `Guest (${txData.phoneProvided.slice(-4)})`,
                tier: txData.totalAmount >= 5000 ? 'GOLD' : 'SILVER',
                totalSpent: txData.totalAmount,
                visitCount: 1,
                averageSpending: txData.totalAmount,
                lastVisit: newTx.timestamp,
                favoriteTable: txData.tableNumber,
                segments: ['New Customer'],
                pdpaConsent: {
                    marketingAds: false,
                    dataAnalysis: false,
                    acceptedAt: newTx.timestamp
                }
            };

            newTx.customerId = newCustomer.id;
            setCustomers(prev => [...prev, newCustomer]);
        }
    };

    const updateCustomerSegments = (customerId: string, newSegments: string[]) => {
        setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, segments: newSegments } : c));
    };

    const registerLineAccount = (phone: string, lineUid: string, name: string) => {
        setCustomers(prev => {
            const existing = prev.find(c => c.phone === phone);
            if (existing) {
                return prev.map(c => c.phone === phone ? { ...c, lineUid, name } : c);
            } else {
                // Create new if not exists
                return [...prev, {
                    id: `c-${Date.now()}`,
                    phone,
                    lineUid,
                    name,
                    tier: 'SILVER',
                    totalSpent: 0,
                    visitCount: 0,
                    averageSpending: 0,
                    lastVisit: new Date().toISOString(),
                    segments: ['New Registered'],
                    pdpaConsent: { marketingAds: false, dataAnalysis: false, acceptedAt: new Date().toISOString() }
                }];
            }
        });
    };

    const updateConsent = (customerId: string, marketingAds: boolean, dataAnalysis: boolean) => {
        setCustomers(prev => prev.map(c => c.id === customerId ? {
            ...c,
            pdpaConsent: { marketingAds, dataAnalysis, acceptedAt: new Date().toISOString() }
        } : c));
    };

    return (
        <CDPDataContext.Provider value={{ customers, transactions, addTransaction, updateCustomerSegments, registerLineAccount, updateConsent }}>
            {children}
        </CDPDataContext.Provider>
    );
};

export const useCDP = () => {
    const context = useContext(CDPDataContext);
    if (!context) {
        throw new Error('useCDP must be used within a CDPDataProvider');
    }
    return context;
};
