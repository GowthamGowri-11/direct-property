// Seed Script - Creates default admin and sample data
const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('./models/Admin');
const User = require('./models/User');
const Property = require('./models/Property');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await Admin.deleteMany({});
    await User.deleteMany({});
    await Property.deleteMany({});
    console.log('Cleared existing data');

    // Create default admin
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123',
      email: 'admin@directproperty.com'
    });
    console.log('Default admin created:', admin.username);

    // Create sample users
    const users = await User.create([
      {
        name: 'Rajesh Kumar',
        email: 'john@example.com',
        password: 'password123',
        phone: '+91 98765 43210',
        address: '123 MG Road, Bangalore, Karnataka'
      },
      {
        name: 'Priya Sharma',
        email: 'jane@example.com',
        password: 'password123',
        phone: '+91 98765 43211',
        address: '456 Anna Salai, Chennai, Tamil Nadu'
      }
    ]);
    console.log('Sample users created:', users.length);

    // Create sample properties
    const properties = await Property.create([
      {
        landSize: '5 acres',
        landType: 'Agricultural land',
        yearsOfOwnership: 15,
        ownerName: 'Ramesh Patel',
        landAddress: 'Survey No. 123, Village Kothrud, Pune',
        pincode: '411038',
        contactName: 'Rajesh Kumar',
        contactEmail: 'john@example.com',
        contactPhone: '+91 98765 43210',
        contactAddress: '123 MG Road, Bangalore, Karnataka',
        price: 7500000,
        status: 'available',
        seller: users[0]._id
      },
      {
        landSize: '0.5 acres',
        landType: 'Residential land',
        yearsOfOwnership: 8,
        ownerName: 'Lakshmi Iyer',
        landAddress: 'Plot No. 45, Sector 21, Navi Mumbai',
        pincode: '400706',
        contactName: 'Priya Sharma',
        contactEmail: 'jane@example.com',
        contactPhone: '+91 98765 43211',
        contactAddress: '456 Anna Salai, Chennai, Tamil Nadu',
        price: 15000000,
        status: 'available',
        seller: users[1]._id
      },
      {
        landSize: '2 acres',
        landType: 'Industrial land',
        yearsOfOwnership: 20,
        ownerName: 'Suresh Reddy',
        landAddress: 'KIADB Industrial Area, Whitefield, Bangalore',
        pincode: '560066',
        contactName: 'Rajesh Kumar',
        contactEmail: 'john@example.com',
        contactPhone: '+91 98765 43210',
        contactAddress: '123 MG Road, Bangalore, Karnataka',
        price: 25000000,
        status: 'available',
        seller: users[0]._id
      },
      {
        landSize: '10 acres',
        landType: 'Agricultural land',
        yearsOfOwnership: 25,
        ownerName: 'Kavita Singh',
        landAddress: 'Village Mehrauli, Near Gurgaon, Haryana',
        pincode: '122001',
        contactName: 'Priya Sharma',
        contactEmail: 'jane@example.com',
        contactPhone: '+91 98765 43211',
        contactAddress: '456 Anna Salai, Chennai, Tamil Nadu',
        price: 12000000,
        status: 'pending',
        seller: users[1]._id
      },
      {
        landSize: '1 acre',
        landType: 'Residential land',
        yearsOfOwnership: 5,
        ownerName: 'Anil Verma',
        landAddress: 'Banjara Hills, Road No. 12, Hyderabad',
        pincode: '500034',
        contactName: 'Rajesh Kumar',
        contactEmail: 'john@example.com',
        contactPhone: '+91 98765 43210',
        contactAddress: '123 MG Road, Bangalore, Karnataka',
        price: 20000000,
        status: 'sold',
        seller: users[0]._id
      }
    ]);
    console.log('Sample properties created:', properties.length);

    console.log('\n=== Seed Complete ===');
    console.log('Admin Login: username: admin, password: admin123');
    console.log('User Login: email: john@example.com, password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

seedData();
