import { Stack, TextField, Typography } from '@mui/material';
import { changeBioApi } from 'apps/main/src/api';
import { ChangeEvent, useEffect, useState } from 'react';
import { ButtonAtom } from '../../atoms';

type Props = {
  content: string;
};

export function ProfileBioMolecule({ content = '' }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(content);

  const edit = () => setIsEditing(true);

  const cancelEdit = () => setIsEditing(false);

  const resetBio = () => setBio(content);

  const bioChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setBio(e.target.value);

  const changeBio = async () => {
    cancelEdit();
    await changeBioApi(bio.trim());
  };

  useEffect(() => {
    resetBio();
  }, [isEditing]);

  return (
    <>
      {!isEditing && (
        <>
          <Typography className="profile__bio">{content}</Typography>
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
            value={bio}
            onChange={bioChangeHandler}
          />

          <Stack direction="row" justifyContent="flex-end" gap={1}>
            <ButtonAtom onClick={cancelEdit}>Huỷ</ButtonAtom>
            <ButtonAtom
              disabled={bio.trim() === content || !bio.trim()}
              className="save-button"
              onClick={changeBio}
            >
              Lưu
            </ButtonAtom>
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

          .save-button {
            background: #1b74e4;
            color: white !important;
          }

          .save-button:hover {
            background: #1b74e4;
          }

          .save-button:disabled {
            background: #e4e6eb;
          }
        `}
      </style>
    </>
  );
}
