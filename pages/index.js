import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #fff;
    color: #333;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff;
`;

const Header = styled.h1`
  color: #ff0000;
  margin-bottom: 20px;
`;

const SubHeader = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff0000;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`;

const ItemName = styled.span`
  color: #333;
`;

const ItemQuantity = styled.span`
  color: #555;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #ff0000;
  cursor: pointer;

  &:hover {
    color: #cc0000;
  }
`;

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);
  const [updateId, setUpdateId] = useState(null);
  const [updateItem, setUpdateItem] = useState('');
  const [updateQuantity, setUpdateQuantity] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/read');
    const data = await res.json();
    setItems(data.items);
  };

  const addItem = async () => {
    await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_name: newItem, quantity: newQuantity }),
    });
    fetchItems();
    setNewItem('');
    setNewQuantity(0);
  };

  const deleteItem = async (id) => {
    await fetch('/api/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchItems();
  };

  const updateItemDetails = async () => {
    await fetch('/api/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: updateId, item_name: updateItem, quantity: updateQuantity }),
    });
    fetchItems();
    setUpdateId(null);
    setUpdateItem('');
    setUpdateQuantity(0);
  };

  return (
    <Container>
      <GlobalStyle />
      <Header> Manajemen Barang Gudang</Header>
      <Input
        placeholder="Nama Barang"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <Input
        placeholder="Jumlah"
        type="number"
        value={newQuantity}
        onChange={(e) => setNewQuantity(parseInt(e.target.value))}
      />
      <Button onClick={addItem}>Tambah Barang</Button>

      <SubHeader>Stok Barang</SubHeader>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <div>
              <ItemName>{item.item_name}</ItemName> - <ItemQuantity>{item.quantity} pcs</ItemQuantity>
            </div>
            <div>
              <IconButton onClick={() => deleteItem(item.id)}>🗑️</IconButton>
              <IconButton onClick={() => { setUpdateId(item.id); setUpdateItem(item.item_name); setUpdateQuantity(item.quantity); }}>✏️</IconButton>
            </div>
          </ListItem>
        ))}
      </List>

      {updateId && (
        <div>
          <SubHeader>Perbarui Barang</SubHeader>
          <Input
            placeholder="Nama Barang"
            value={updateItem}
            onChange={(e) => setUpdateItem(e.target.value)}
          />
          <Input
            placeholder="Jumlah"
            type="number"
            value={updateQuantity}
            onChange={(e) => setUpdateQuantity(parseInt(e.target.value))}
          />
          <Button onClick={updateItemDetails}>Perbarui</Button>
        </div>
      )}
    </Container>
  );
}
