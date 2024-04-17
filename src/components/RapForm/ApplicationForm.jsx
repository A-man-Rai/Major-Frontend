import React, { useState,useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider, Button,Grid} from '@mui/material';
import Field from './Field';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from './Calendar';
import { useSelector ,useDispatch} from 'react-redux';
import { setSession } from '../ReduxStore/slices/ValidUserSlice';
import axios from 'axios';
import UploadButton from "./UploadButton"
import UploadDone from './UploadDone';
import {imageDB} from "../../firebaseConfig.js"
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"


export default function ApplicationForm({setShowSubmitted,setShowForm,setRecords}) {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
const [image1,setImage1]=useState(null);
const [image2,setImage2]=useState(null);
const [image3,setImage3]=useState(null);
  const dispatch=useDispatch();
  const userId=useSelector(state=>state.validUser.userId);
  const token=useSelector(state=>state.validUser.token);
  const email=useSelector(state=>state.register.email)

  const [data, setData] = useState({
    userId:parseInt(userId),
    name: "",
    dob: "",
    occupation:"",
    nationality:"",
    passportNo:"",
    dateOfIssue: "",
    validUpTo:"",
    ilpNo: "",
    visaNo: "",
    visaIssue: "",
    visaValidUpto: "",
    residentialAddress: "",
    dateOfVisit: "",
    durationOfStay: "",
    travelArrangement: "",
    urlA:"",
    urlB:"",
    urlC:""
  });

  const handleFieldChange = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        data.dob !== "" &&
        data.dateOfIssue !== "" &&
        data.validUpTo !== "" &&
        data.visaIssue !== "" &&
        data.visaValidUpto !== "" &&
        data.dateOfVisit !== "" &&
        data.durationOfStay !== "" &&
        image1!=null &&
        image2!=null &&
        image3!=null 
      ) {
        const arr=email.split("@");
        const folder=arr[0];
        const image1Ref=ref(imageDB,`${folder}/${Date.now()}-${image1.name}`)
        const image2Ref=ref(imageDB,`${folder}/${Date.now()}-${image2.name}`)
        const image3Ref=ref(imageDB,`${folder}/${Date.now()}-${image3.name}`)

        const a= await uploadBytes(image1Ref,image1)
        const b= await uploadBytes(image2Ref,image2)
        const c= await uploadBytes(image3Ref,image3)
        const urlA=await getDownloadURL(a.ref)
        const urlB=await getDownloadURL(b.ref)
        const urlC=await getDownloadURL(c.ref)
          const array1=urlA.split(folder)
          const array2=urlB.split(folder)
          const array3=urlC.split(folder)
          data.urlA=array1[1];
          data.urlB=array2[1];
          data.urlC=array3[1];
         // console.log(array1)
        const response = await axios.post(
          'http://localhost:9001/submit',
          data,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
          }
        );
  
        if (response.data.submit) {
          setShowForm(false);
          setShowSubmitted(true);
          setRecords(data);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
         dispatch(setSession(true));
       // console.log('Token expired. Please log in again.');
      } else {
        console.error('An error occurred:', error);
      }
    }
  };
  


  const styles = {
    paper: {
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
    }
  };
 
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mb: 4  }} >
      <Paper
      component="form"
      variant="contained"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      onSubmit={handleSubmit}
      style={styles.paper}
    >
    <Grid container gap={2} alignItems="center">
      <Grid item xs={12} md={7}>
        <Typography component="h1" variant="h5" sx={{ fontWeight:"bold" }}>
          APPLICATION FOR RESTRICTED AREA
        </Typography>
      </Grid>
    </Grid>
    
          <Divider sx={{ my: 1 }} />
           <Field id={"name"}  placeholder={"Name of Applicant"} handleFieldChange={handleFieldChange} data={data}/>
           <Calendar id={"dob"} placeholder={"Date Of Birth (DD/MM/YYYY)"} handleFieldChange={handleFieldChange} data={data}></Calendar>
           <Field id={"nationality"} placeholder={"Nationality"} handleFieldChange={handleFieldChange} data={data}/>
           <Field id={"occupation"} placeholder={"Occupation"} handleFieldChange={handleFieldChange} data={data}/>
         
          <Box display="flex" flexDirection="row" gap={2}>
          <Field id={"passportNo"} placeholder={"Passport No"} handleFieldChange={handleFieldChange} data={data}/>
          <Calendar id={"dateOfIssue"} placeholder={"Date Of Issue"} handleFieldChange={handleFieldChange} data={data} ></Calendar>
           </Box>

          <Calendar id={"validUpTo"} placeholder={"Valid up to"} handleFieldChange={handleFieldChange} data={data} ></Calendar>
          <Field id={"ilpNo"} placeholder={"I.L.P. No"} handleFieldChange={handleFieldChange} data={data}/>
          <Typography sx={{mt:1,mb:1,fontWeight:400}}> Visa Details:</Typography>

          <Box display="flex" flexDirection="row" gap={2}>
          <Field id={"visaNo"} placeholder={"1. No"} handleFieldChange={handleFieldChange} data={data}/>
          <Calendar id={"visaIssue"} placeholder={"2. Issue"} handleFieldChange={handleFieldChange} data={data}></Calendar>
          </Box>
            
          <Calendar id={"visaValidUpto"} placeholder={"3. valid up to"} handleFieldChange={handleFieldChange} data={data}></Calendar>
          <Field id={"residentialAddress"} placeholder={"Residential Address"} handleFieldChange={handleFieldChange} data={data}/>
          <Calendar id={"dateOfVisit"} placeholder={"Date of visit"} handleFieldChange={handleFieldChange} data={data}></Calendar>
         
          <Calendar id={"durationOfStay"} placeholder={"Duration of stay "} handleFieldChange={handleFieldChange} data={data}></Calendar>

          <Field id={"travelArrangement"} placeholder={"Travel arrangement made by"} handleFieldChange={handleFieldChange} data={data}/>
          <Box display="flex" justifyContent="space-evenly">
          {image1 ?<UploadDone set={setImage1}/>: <UploadButton name="PASSPORT" set={setImage1} /> }
          {image2 ?<UploadDone set={setImage2}/>: <UploadButton name="VISA" set={setImage2}/> }
          {image3 ?<UploadDone set={setImage3}/>: <UploadButton name="ILP" set={setImage3}/>}
          </Box>
         <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
         <Button variant='contained' type='submit' color='success'>SUBMIT</Button>
         </Box>
       
        </Paper>
      </Container>
    </React.Fragment>
  );
}
