import toast from 'react-hot-toast';

interface AppointmentData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  date: string;
  reason: string;
}

export const createAppointment = async (appointmentData: AppointmentData) => {
  const toastId = toast.loading('Creating appointment...');
  
  try {
    const payload = {
      firstName: appointmentData.firstName,
      lastName: appointmentData.lastName,
      email: appointmentData.email,
      phoneNumber: appointmentData.phoneNumber,
      date: appointmentData.date,
      reason: appointmentData.reason
    };

    console.log('Sending appointment data:', payload);
    console.log('API URL:', `${process.env.NEXT_PUBLIC_API_URL}/api/create-appointment`);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { message: responseText };
      }
      
      console.log('Failed to create appointment:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      toast.error(errorData?.message || 'Failed to create appointment', {
        id: toastId,
      });
      throw new Error(errorData?.message || 'Failed to create appointment');
    }

    const data = JSON.parse(responseText);
    toast.success('Appointment created successfully!', {
      id: toastId,
    });
    return data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    toast.error('An unexpected error occurred', {
      id: toastId,
    });
    throw error;
  }
}; 