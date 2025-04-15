import prisma from '@/lib/prisma';

const about = async () => {

  await prisma.member.create({
    data: {
      fullName: 'Test4 Name',
      dateOfBirth: new Date('2000-01-01'),
      age: 25,
      gender: 'Female',
      civilStatus: 'Single',
      homeAddress: '123 Test St.',
      contactNumber: '123-456-7890',
      email: 'test4@gmail.com',
      occupation: 'Software Developer',
      employer: 'Tech Company',
      isResident: true,
      previousMembership: 'None',
      purpose: 'Cash Benefits',
      initialShareCapital: 1000.00,
      paymentMethod: 'Cash',
      beneficiaryName: 'John Doe',
      relationship: 'Brother',
      beneficiaryContact: '987-654-3210',
      signature: 'file_path', 
    },
  });


  const applications = await prisma.member.findMany();
  console.log(applications);

  return (
    <>
      <h1>About Page - Test</h1>
      <pre>{JSON.stringify(applications, null, 2)}</pre>
    </>
  );
}

export default about;
