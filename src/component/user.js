import { BoltIcon, DevicePhoneMobileIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline'
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';

export default function User() {
   
  const [data, setData] = useState("")
  console.log(data.email)
  //เรียกใช้แค่ครั้งเดียว useEffect(() => { },[]);
  useEffect(() => { 
    //เก็บ token ไว้ localStorage
    const token = localStorage.getItem('token');
    fetch('http://localhost:3333/authen', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      },
     
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.status === 'OK'){
              console.log('Success:', data);
              setData(data.decode)
            } else {
              localStorage.removeItem('token')
              window.location = '/'
            }
            
          })
          .catch((error) => {
            console.error('Error:', error);
          });
         
         
  },[]);

  
    const handleLogout = (event) => {
      event.preventDefault();
      localStorage.removeItem('token');
      window.location = '/'
    }
  return (
    <div className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="grid grid-cols-3 gap-y-10 gap-x-6 sm:grid-cols-4  lg:grid-cols-6 xl:gap-x-8 mx-20 mt-10">
   
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-2xl font-semibold leading-8 text-indigo-600">DATA User</h2>
      
           <p className="text-2xl py-5">
           Email: {data.email}
           </p>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-44">
          <Button
              // type="submit"
              fullWidth
              variant="contained"
              onClick={handleLogout}
              sx={{ mt: 3, mb: 2 }}
              className = " "
            >
             Logout
            </Button>
          </div>
        </div>
       
      
      </div>
    </div>
  )
}
