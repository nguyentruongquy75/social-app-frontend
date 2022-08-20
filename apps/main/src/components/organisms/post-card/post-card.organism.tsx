import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { CommonItemAtom } from '../../atoms';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { MoreHoriz } from '@mui/icons-material';
import { usePopover } from 'apps/main/src/hooks';
import {
  MoreButtonMolecule,
  PostActions,
  PostCommentMolecule,
  PostImagesMolecule,
  PostInfo,
} from '../../molecules';
import { CommentItemMolecule } from '../../molecules/comment-item/comment-item.molecule';

type Props = {};

const images = [
  'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=550',
  'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg',
  'https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg',
  'https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg?auto=compress&cs=tinysrgb&h=350',
  'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350',
  'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&h=350',
];

export function PostCardOrganism({}: Props) {
  return (
    <>
      <Card>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            pt: 1,
            px: 2,
          }}
        >
          <CommonItemAtom
            roundedImage
            imageSize={40}
            image={Avatar}
            title="Nguyễn Trường Quý"
            subtitle="1 giờ"
          />

          <MoreButtonMolecule />
        </Stack>

        <PostContent content="Hello" />

        <PostImagesMolecule images={images} />

        <PostInfo />

        <PostActions />

        <PostCommentMolecule />
      </Card>
    </>
  );
}

type PostContentProps = { content: string };

function PostContent({ content }: PostContentProps) {
  return (
    <CardContent>
      <Typography>{content}</Typography>
    </CardContent>
  );
}
