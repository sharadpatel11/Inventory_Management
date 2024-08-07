'use client'
import { useState, useEffect } from "react";
import { firestore } from "@/firebase"; 
import { getDocs, getDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { Box, Modal, Typography, Stack, TextField, Button } from "@mui/material";
import { collection, query } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = []
    docs.forEach(doc => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      })
    });
    setInventory(inventoryList);
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      const {quantity} = docSnap.data();
      await setDoc(docRef, {quantity: quantity + 1});
    }
    else {
      await setDoc(docRef, {quantity: 1});
    }

    await updateInventory();
  }


  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      const {quantity} = docSnap.data();
      if(quantity === 1){
        await deleteDoc(docRef);
      }
      else{
        await setDoc(docRef, {quantity: quantity - 1});
      }
    }

    await updateInventory();
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    updateInventory();
  },[])

  return (
    <Box width="100vw" 
        height="100vh" 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        gap={2}
        overflow="auto">
      <Modal open={open} 
          onClose={handleClose}>
        <Box position="absolute"
            top="50%"
            left="50%"
            width={400} 
            bgcolor="white" 
            border="2px solid #000" 
            boxShadow={24} 
            p={4} 
            display="flex"
            flexDirection="column"  
            gap={3} 
            sx={{
              transform: "translate(-50%, -50%)"
            }}
        >          
          <Typography variant="h6" color="black">Add Item</Typography>
          <Stack width="100%" display="flex" flexDirection="row" gap={2}>
            <TextField
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                }} 
            />
            <Button
                variant="contained"
                onClick={() => {
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Typography variant="h1">Inventory Management</Typography>
      <Button 
          variant="contained"
          onClick={() => {
            handleOpen()
          }}>
        Add New Item
      </Button>
      <Box border="1px solid #ffff">
        <Box
            width="800px"
            height="100px"
            bgcolor="#3C3CBB"
            display="flex"
            alignItems="center"
            justifyContent="center">
          <Typography variant="h3">Inventory Items</Typography>
        </Box>
      </Box>
      <Box border="1px solid #ffff" overflow="auto">
        <Stack width="800px" height="350px" spacing={2}>
            {
              inventory.map(({name, quantity}) => (
                <Box key={name} width="100%" minHeight="100px" display="flex"
                  alignItems="center" justifyContent="space-between" bgcolor="#0000" padding={5}>
                    <Typography width="300px" variant="h4" textAlign="left">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                    <Typography variant="h4" textAlign="center">{quantity}</Typography>
                    <Stack display="flex" flexDirection="row" gap={2}>
                      <Button width="100px" variant="contained" onClick={() => { addItem(name) }}>
                        Add
                      </Button>
                      <Button variant="contained" onClick={() => { removeItem(name) }}>
                        Remove
                      </Button>
                    </Stack>
                  </Box>
              ))
            }
        </Stack>
      </Box>
    </Box>
    )
}
