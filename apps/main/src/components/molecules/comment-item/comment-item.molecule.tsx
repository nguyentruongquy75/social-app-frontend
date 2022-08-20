import { Box, Grid, Stack, Typography } from '@mui/material';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { IconButtonAtom } from '../../atoms';
import { MoreButtonMolecule } from '../more-button/more-button.molecule';

export function CommentItemMolecule() {
  return (
    <>
      <Stack direction="row" alignItems="flex-start" gap={1}>
        <Box component="img" src={Avatar} className="comment__avatar" />
        <Box>
          <Box className="comment__right">
            <Typography className="comment__user">Top Comments</Typography>
            <Typography className="comment__content">
              Dành cho những ai chưa tìm được nơi đăng kí thi giấy phép lái xe
              uy tín thì dưới đây là 1 sự lựa chọn hợp lý. Trung tâm sát hạch
              lái xe Tâm An hỗ trợ các bạn sinh viên tìm được nơi uy tín với giá
              ưu đãi nhất: - Lịch thi và lịch học sẽ lưu động tất cả các ngày
              trong tuần để học viên lựa chọn sao cho phù hợp và thuận tiện nhất
              tránh lịch học của sinh viên. - Đây là một đơn vị có kinh nghiệm,
              chuyên môn và đã cộng tác với rất nhiều trường Đại học ở TP Hà
              Nội. CÁC GÓI HỒ SƠ: 1. Gói thường: 349.000 Đ ( Sẽ được phát tài
              liệu ôn thi miễn phí) Gói V1: 399.000 Đ ( Được hỗ trợ lý thuyết
              hoặc thực hành) Gói V2: 449.000 Đ ( được hỗ trợ cả lý thuyết và
              thực hành)
              <Typography className="comment__seemore">Xem thêm</Typography>
            </Typography>
            <Stack direction="row"></Stack>
          </Box>
          <Box>
            <Stack direction="row" gap={2} pl={1}>
              <Typography className="comment__action">Thích</Typography>
              <Typography className="comment__action">Phản hồi</Typography>
              <Typography className="comment__time">2 ngày</Typography>
            </Stack>
          </Box>
        </Box>

        <Box>
          <MoreButtonMolecule />
        </Box>
      </Stack>

      <style jsx global>
        {`
          .comment__avatar {
            width: 32px;
            border-radius: 50%;
          }

          .comment__right {
            background-color: #f0f2f5;
            padding: 8px 12px;
            border-radius: 18px;
          }

          .comment__user {
            font-size: 13px;
            font-weight: 500;
            word-break: break-all;
            display: inline-block;
          }

          .comment__user:hover {
            cursor: pointer;
            text-decoration: underline;
          }

          .comment__content {
            font-size: 15px;
            word-break: break-word;
          }

          .comment__seemore {
            font-size: 15px;
            font-weight: 500;
            display: inline-block;
            cursor: pointer;
          }

          .comment__action {
            font-size: 13px;
            font-weight: 600;
          }

          .comment__action:hover {
            text-decoration: underline;
            cursor: pointer;
          }

          .comment__time {
            font-size: 13px;
          }
        `}
      </style>
    </>
  );
}
