'use client';

import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField, IconButton } from '@mui/material';
import { Add, DeleteOutlined, AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { firestore } from '@/firebase';
import {
  collection,
  doc, 
  getDocs, 
  query, 
  setDoc, 
  deleteDoc, 
  getDoc,
} from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState(dayjs());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Spices', 'Dairy', 'Protein'];

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item, quantity, expiryDate) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data();
      await setDoc(docRef, { quantity: existingQuantity + quantity, expiryDate });
    } else {
      await setDoc(docRef, { quantity, expiryDate });
    }

    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const incrementQuantity = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
      await updateInventory();
    }
  };

  const decrementQuantity = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().quantity > 1) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity - 1 });
      await updateInventory();
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setItemName('');
    setQuantity(1);
    setExpiryDate(dayjs());
    setOpen(false);
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#1b1f3b" color="#cbd5e1">
      {/* Sidebar */}
      <Box width="250px" p={2} bgcolor="#1e293b">
        <Typography variant="h6" mb={2}>
          Pantry Categories
        </Typography>
        <Stack spacing={2}>
          {categories.map((category) => (
            <Box
              key={category}
              display="flex"
              alignItems="center"
              gap={2}
              onClick={() => setSelectedCategory(category)}
              sx={{ cursor: 'pointer', color: selectedCategory === category ? '#ff4081' : '#cbd5e1' }}
            >
              {/* Placeholder icons */}
              <Box width={24} height={24} bgcolor="#0f172a" borderRadius="50%" />
              <Typography>{category}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Main content */}
      <Box flex="1" p={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4">Pantry Management</Typography>
          <Box display="flex" alignItems="center">
            <TextField
              placeholder="Search items..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mr: 2, bgcolor: '#0f172a', borderRadius: 1 }}
              InputProps={{
                style: { color: '#cbd5e1' },
              }}
            />
            <IconButton color="primary" onClick={handleOpen}>
              <Add />
            </IconButton>
          </Box>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: '#ff4081' }}
            >
              Add Item
            </Typography>
            <Stack spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item Name"
                sx={{ color: 'primary' }}
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <TextField
                id="outlined-quantity"
                label="Quantity"
                sx={{ color: 'primary' }}
                variant="outlined"
                fullWidth
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Expiration Date"
                  value={expiryDate}
                  onChange={(newValue) => setExpiryDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName, quantity, expiryDate.format('YYYY-MM-DD'));
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={3}>
          {filteredInventory.map(({ name, quantity, expiryDate }) => (
            <Box
              key={name}
              p={2}
              bgcolor="#1e293b"
              borderRadius={2}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h6">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                <Typography variant="body2">Quantity: {quantity}</Typography>
                <Typography variant="body2">Expires on: {expiryDate}</Typography>
              </Box>
              <Box mt={2} display="flex" justifyContent="space-between">
                <IconButton color="primary" onClick={() => incrementQuantity(name)} sx={{ mx: 0.5 }}>
                  <AddCircleOutline />
                </IconButton>
                <IconButton color="secondary" onClick={() => decrementQuantity(name)} sx={{ mx: 0.5 }}>
                  <RemoveCircleOutline />
                </IconButton>
                <IconButton color="error" onClick={() => removeItem(name)}>
                  <DeleteOutlined />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
