import { Grid } from '@mui/material';
import { HEADER_HEIGHT } from 'apps/main/src/constants';
import { ContainerAtom } from '../../atoms';
import { Header } from '../../organisms';

type Props = {
  left?: JSX.Element;
  right?: JSX.Element;
  main?: JSX.Element;
  column: number;
};

const LAYOUT = {
  TWO_COLUMN: 2,
  THREE_COLUMN: 3,
};

export function BaseLayout({ left, right, main, column }: Props) {
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

  const isThreeColumn = column === LAYOUT.THREE_COLUMN;

  switch (column) {
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
      <ContainerAtom sx={{ paddingTop: HEADER_HEIGHT + 'px' }}>
        <Grid container>
          <Grid
            item
            xs={gridLayoutColumn.left.xs}
            md={gridLayoutColumn.left.md}
            sx={{
              display: {
                xs: isThreeColumn ? 'none' : 'block',
                md: 'block',
              },
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
                xs: isThreeColumn ? 'none' : 'block',
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
