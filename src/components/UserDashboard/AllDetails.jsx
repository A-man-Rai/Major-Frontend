import React, { useState } from 'react';
import { Typography, Paper, Box, Grid, Button } from '@mui/material';
import { formatDate } from '../Admin/Records/dateFormat.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';
import ShowDocuments from './ShowDocuments.jsx';

const AllDetails = ({application,setDetails,setShowStatus,links}) => {
  const styles = {
    paper: {
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0.4, 0.4, 0.4, 0.4)',
    },
    backButton: {
      marginBottom: '20px',
    },
    buttonGroup: {
      marginTop: '20px',
    },
    field: {
      marginBottom: '10px',
    },
  };
  const email=localStorage.getItem("email")
  const starting="https://firebasestorage.googleapis.com/v0/b/documentsupload-e023f.appspot.com/o/"
  const arr=email.split("@");
  const folder=arr[0];
  const link=links.userImages
  const images=[{link:starting + folder + link[0].link,name:"first"},
               {link:starting + folder + link[1].link,name:"second"},
               {link:starting + folder + link[2].link,name:"third"},
               {link:starting + folder + link[3].link,name:"fourth"},
              ]

  return (
    <Box>
      <ArrowBackIcon
        onClick={() => {
          setDetails(false);
          setShowStatus(true);
        }}
        style={styles.backButton}
      />
      <Paper variant="contained" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} style={styles.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              APPLICATION FOR RESTRICTED AREA
            </Typography>
            <Box style={styles.field}>
              <Typography>Name : {application.name}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Dob : {formatDate(application.dob)}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Date of Visit : {formatDate(application.dateOfVisit)}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Nationality : {application.nationality}</Typography>
            </Box>
            <Box style={styles.field}>
             <Typography>Occupation : {application.occupation}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Duration of Stay : {formatDate(application.durationOfStay)}</Typography>
            </Box>
            <Box style={styles.field}>
            <Typography>Residential Address: {application.residentialAddress}</Typography>
            </Box>
            <Box style={styles.field}>
            <Typography>Travel Arrangement By: {application.travelArrangementBy}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: {  md: 6 }}}>
           <Box style={styles.field}>
           <Typography>Ilp No : {application.ilpNo}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Passport No: {application.passportNo}</Typography>
            </Box>
            <Box style={styles.field}>
              <Typography>Passport Valid Upto: {formatDate(application.passportValidUpto)}</Typography>
            </Box>
            
            <Box style={styles.field}>
              <Typography>Visa No: {application.visaNo}</Typography>
            </Box>
            <Box style={styles.field}>
             <Typography>Visa Issue: {formatDate(application.visaIssue)}</Typography>
            </Box>
            <Box style={styles.field}>
            <Typography>Visa Valid Upto: {formatDate(application.visaValidUpto)}</Typography>
            </Box>
            <ShowDocuments images={images}></ShowDocuments>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AllDetails;
