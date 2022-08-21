import { Grid } from '@mui/material';
import { HEADER_HEIGHT } from 'apps/main/src/constants';
import { ContainerAtom } from '../../atoms';
import { Header } from '../../organisms';

type Props = {
  left?: JSX.Element;
  right?: JSX.Element;
  main?: JSX.Element;
  column: number;
  leftBackground?: string;
};

const LAYOUT = {
  ONE_COLUM: 1,
  TWO_COLUMN: 2,
  THREE_COLUMN: 3,
};

export function BaseLayout({
  left,
  right,
  main,
  column,
  leftBackground,
}: Props) {
  const gridLayoutColumn = {
    left: {
      xs: 0,
      md: 0,
    },
    main: {
      xs: 0,
      md: 0,
    },
    right: {
      xs: 0,
      md: 0,
    },
  };

  const isThreeColumnOrOneColumn =
    column === LAYOUT.THREE_COLUMN || column === LAYOUT.ONE_COLUM;

  switch (column) {
    case LAYOUT.ONE_COLUM:
      gridLayoutColumn.left = {
        xs: 0,
        md: 0,
      };
      gridLayoutColumn.main = {
        xs: 12,
        md: 12,
      };
      gridLayoutColumn.right = {
        xs: 0,
        md: 0,
      };
      break;

    case LAYOUT.THREE_COLUMN:
      gridLayoutColumn.left = {
        xs: 0,
        md: 3,
      };
      gridLayoutColumn.main = {
        xs: 12,
        md: 6,
      };
      gridLayoutColumn.right = {
        xs: 0,
        md: 3,
      };
      break;

    case LAYOUT.TWO_COLUMN:
      gridLayoutColumn.left = {
        xs: 3,
        md: 3,
      };
      gridLayoutColumn.main = {
        xs: 9,
        md: 9,
      };
      break;

    default:
      break;
  }

  return (
    <>
      <Header />
      <ContainerAtom sx={{ paddingTop: HEADER_HEIGHT + 'px' }} disablePadding>
        <Grid container>
          <Grid
            item
            xs={gridLayoutColumn.left.xs}
            md={gridLayoutColumn.left.md}
            sx={{
              display: {
                xs: isThreeColumnOrOneColumn ? 'none' : 'block',
                md: 'block',
              },
              background: leftBackground,
            }}
            className="sticky"
          >
            {left}
          </Grid>
          <Grid
            item
            xs={gridLayoutColumn.main.xs}
            md={gridLayoutColumn.main.md}
          >
            {main}
          </Grid>
          <Grid
            item
            xs={gridLayoutColumn.right.xs}
            md={gridLayoutColumn.right.md}
            sx={{
              display: {
                xs: isThreeColumnOrOneColumn ? 'none' : 'block',
                md: 'block',
              },
            }}
            className="sticky"
          >
            {column === LAYOUT.THREE_COLUMN && right}
          </Grid>
        </Grid>
      </ContainerAtom>

      <style jsx global>
        {`
          .sticky {
            position: sticky;
            top: 56px;
            max-height: 0;
          }
        `}
      </style>
    </>
  );
}
