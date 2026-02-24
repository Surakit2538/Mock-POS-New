import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'คาโบนาร่า สปาเก็ตตี้',
    price: 79,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=400',
    description: 'สปาเก็ตตี้เส้นเหนียวนุ่ม ผสมซอสคาโบนาร่า รสชาติกลมกล่อม หอมมันชีส',
    calory: '450 kcal',
    deliveryCost: 'Free',
    deliveryTime: '15 นาที'
  },
  {
    id: '2',
    name: 'สปาเก็ตตี้ขี้เมา',
    price: 89,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400',
    description: 'สปาเก็ตตี้ผัดขี้เมา รสชาติจัดจ้าน หอมกลิ่นสมุนไพรแบบไทยแท้',
    calory: '420 kcal',
    deliveryCost: 'Free',
    deliveryTime: '15 นาที'
  },
  {
    id: '3',
    name: 'ผัดซีอิ๊ว',
    price: 60,
    image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=400',
    description: 'เส้นใหญ่ผัดซีอิ๊วใส่หมูนุ่ม หอมกลิ่นกระทะ พร้อมผักคะน้ากรอบอร่อย',
    calory: '550 kcal',
    deliveryCost: 'Free',
    deliveryTime: '10 นาที'
  },
  {
    id: '4',
    name: 'สเต็กหมู ราดซอสกี่วี่',
    price: 99,
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=400',
    description: 'สเต็กหมูนุ่มชุ่มฉ่ำ ราดซอสกี่วี่รสเปรี้ยวอมหวานตัดเลี่ยน อร่อยสดชื่น',
    calory: '500 kcal',
    deliveryCost: 'Free',
    deliveryTime: '20 นาที'
  },
  {
    id: '5',
    name: 'ผัดไทยกุ้งสด',
    price: 79,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=400',
    description: 'ผัดไทยกุ้งสดตัวโต เส้นเหนียวนุ่ม ซอสสูตรเข้มข้น หอมกลิ่นถั่วลิสงคั่ว',
    calory: '480 kcal',
    deliveryCost: 'Free',
    deliveryTime: '15 นาที'
  },
  {
    id: '6',
    name: 'ไอศกรีมกะทิ',
    price: 25,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=400',
    description: 'ไอศกรีมกะทิสด หอมหวานมัน สไตล์ไทยแท้ เสิร์ฟพร้อมท็อปปิ้ง',
    calory: '200 kcal',
    deliveryCost: 'Free',
    deliveryTime: '5 นาที'
  },
  {
    id: '7',
    name: 'ลาบหมู',
    price: 69,
    image: 'https://images.unsplash.com/photo-1544378730-8b5104b18790?auto=format&fit=crop&q=80&w=400',
    description: 'ลาบหมูรสแซ่บ จัดจ้านด้วยเครื่องเทศและข้าวคั่วหอมกรุ่น',
    calory: '300 kcal',
    deliveryCost: 'Free',
    deliveryTime: '10 นาที'
  },
  {
    id: '8',
    name: 'สลัดแซลมอน นอร์เวย์',
    price: 100,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400',
    description: 'สลัดผักออร์แกนิคสดใหม่ เสิร์ฟพร้อมแซลมอนนอร์เวย์ชิ้นโต และน้ำสลัดงา',
    calory: '250 kcal',
    deliveryCost: 'Free',
    deliveryTime: '15 นาที'
  },
  {
    id: '9',
    name: 'เซตต้มยำแซ่บ เสิร์ฟ',
    price: 129,
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=400',
    description: 'เซตอาหารสุดคุ้ม ต้มยำกุ้งรสจัดจ้าน เสิร์ฟพร้อมข้าวสวยร้อนๆ หอมฉุย',
    calory: '450 kcal',
    deliveryCost: 'Free',
    deliveryTime: '20 นาที'
  },
  {
    id: '10',
    name: 'หมูทอดกระเทียม',
    price: 60,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',
    description: 'หมูชิ้นนุ่มทอดกระเทียมพริกไทย หอมกรุ่น ทานคู่กับข้าวสวยร้อนๆ ยอดเยี่ยมสุดๆ',
    calory: '400 kcal',
    deliveryCost: 'Free',
    deliveryTime: '10 นาที'
  },
  {
    id: '11',
    name: 'ข้าวผัดไข่',
    price: 50,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=400',
    description: 'ข้าวผัดไข่เมล็ดร่วนสวย หอมกลิ่นคั่วกระทะ อร่อยกลมกล่อม ทานง่าย',
    calory: '350 kcal',
    deliveryCost: 'Free',
    deliveryTime: '10 นาที'
  }
];
