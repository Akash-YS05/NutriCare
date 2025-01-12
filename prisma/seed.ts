
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  await prisma.mealDelivery.deleteMany();
  await prisma.mealPlan.deleteMany();
  await prisma.dietChart.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.pantryStaff.deleteMany();
  await prisma.deliveryStaff.deleteMany();
  await prisma.user.deleteMany();

  // Create users with different roles
  const managerPassword = await bcrypt.hash('Password@2025', 10);
  const manager = await prisma.user.create({
    data: {
      email: 'hospital_manager@xyz.com',
      password: managerPassword,
      name: 'Hospital Manager',
      role: 'MANAGER',
      contactInfo: '123-456-7890'
    }
  });

  const pantryPassword = await bcrypt.hash('Password@2025', 10);
  const pantryUser = await prisma.user.create({
    data: {
      email: 'hospital_pantry@xyz.com',
      password: pantryPassword,
      name: 'Pantry Staff',
      role: 'PANTRY_STAFF',
      contactInfo: '123-456-7891',
      pantryStaff: {
        create: {
            location: 'Pantry Room 1'
        }
      }
    }
  });

  const deliveryPassword = await bcrypt.hash('Password@2025', 10);
  const deliveryUser = await prisma.user.create({
    data: {
      email: 'hospital_delivery@xyz.com',
      password: deliveryPassword,
      name: 'Delivery Staff',
      role: 'DELIVERY_STAFF',
      contactInfo: '123-456-7892',
      deliveryStaff: {
        //@ts-ignore
        create: {
            location: 'Delivery Outpost'
        }
      }
    }
  });

  // Create sample patients
  const patient1 = await prisma.patient.create({
    data: {
      name: 'John Doe',
      age: 45,
      gender: 'MALE',
      roomNumber: '101',
      bedNumber: 'A',
      floorNumber: '1',
      contactInfo: '123-456-7893',
      emergencyContact: '123-456-7894',
      diseases: ['Diabetes', 'Hypertension'],
      allergies: ['Peanuts', 'Shellfish']
    }
  });

  // Create diet chart for patient
  const dietChart = await prisma.dietChart.create({
    data: {
      patientId: patient1.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      mealPlans: {
        create: [
          {
            mealType: 'MORNING',
            ingredients: ['Oatmeal', 'Fruits', 'Low-fat milk'],
            instructions: ['No sugar', 'Serve warm']
          },
          {
            mealType: 'EVENING',
            ingredients: ['Grilled chicken', 'Vegetables', 'Brown rice'],
            instructions: ['Low salt', 'No spicy seasoning']
          }
        ]
      }
    }
  });

  // Create patient 2
const patient2 = await prisma.patient.create({
  data: {
    name: 'Jane Smith',
    age: 30,
    gender: 'FEMALE',
    roomNumber: '102',
    bedNumber: 'B',
    floorNumber: '1',
    contactInfo: '987-654-3210',
    emergencyContact: '987-654-3211',
    diseases: ['Asthma'],
    allergies: ['Dairy'],
  }
});

// Create diet chart for patient 2
const dietChart2 = await prisma.dietChart.create({
  data: {
    patientId: patient2.id,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    mealPlans: {
      create: [
        {
          mealType: 'MORNING',
          ingredients: ['Whole wheat toast', 'Scrambled eggs', 'Orange juice'],
          instructions: ['Serve with a side of avocado', 'No butter on toast']
        },
        {
          mealType: 'EVENING',
          ingredients: ['Salmon', 'Sweet potato', 'Spinach'],
          instructions: ['Grill the salmon', 'Steam the spinach lightly']
        }
      ]
    }
  }
});

// Create patient 3
const patient3 = await prisma.patient.create({
  data: {
    name: 'Michael Brown',
    age: 50,
    gender: 'MALE',
    roomNumber: '201',
    bedNumber: 'C',
    floorNumber: '2',
    contactInfo: '555-123-4567',
    emergencyContact: '555-123-4568',
    diseases: ['High blood pressure', 'Arthritis'],
    allergies: ['Gluten', 'Eggs'],
  }
});

// Create diet chart for patient 3
const dietChart3 = await prisma.dietChart.create({
  data: {
    patientId: patient3.id,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    mealPlans: {
      create: [
        {
          mealType: 'MORNING',
          ingredients: ['Egg whites', 'Spinach', 'Tomatoes'],
          instructions: ['No salt', 'Saute spinach lightly']
        },
        {
          mealType: 'EVENING',
          ingredients: ['Chicken breast', 'Quinoa', 'Broccoli'],
          instructions: ['Grill the chicken', 'Cook quinoa as per instructions', 'Steam broccoli']
        }
      ]
    }
  }
});


  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
