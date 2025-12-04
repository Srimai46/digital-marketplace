import { useState } from 'react';

export default function ProductForm({ initial = {}, onSubmit }) {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [price, setPrice] = useState(initial.price || '');
  const [fileUrl, setFileUrl] = useState(initial.fileUrl || '');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ title, description, price, fileUrl }); }} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input placeholder="ชื่อสินค้า" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="รายละเอียด" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="ราคา" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="URL ไฟล์ดิจิทัล" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
      <button type="submit">บันทึก</button>
    </form>
  );
}
