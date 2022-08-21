import { Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { ButtonAtom } from '../../atoms';

export function ProfileBioMolecule() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');

  const edit = () => setIsEditing(true);

  const cancelEdit = () => setIsEditing(false);

  return (
    <>
      {!isEditing && (
        <>
          <Typography className="profile__bio">
            Nothing is Impossible
          </Typography>
          <ButtonAtom fullWidth onClick={edit}>
            Chỉnh sửa tiểu sử
          </ButtonAtom>
        </>
      )}

      {isEditing && (
        <>
          <TextField
            rows={3}
            fullWidth
            multiline
            inputProps={{ style: { textAlign: 'center' } }}
            sx={{ py: 1 }}
          />

          <Stack direction="row" justifyContent="flex-end" gap={1}>
            <ButtonAtom onClick={cancelEdit}>Huỷ</ButtonAtom>
            <ButtonAtom>Lưu</ButtonAtom>
          </Stack>
        </>
      )}

      <style jsx global>
        {`
          .profile__bio {
            font-size: 15px;
            text-align: center;
            padding: 16px 8px;
          }
        `}
      </style>
    </>
  );
}
