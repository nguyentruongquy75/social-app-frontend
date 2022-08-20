import { ArrowBack, Search } from '@mui/icons-material';
import {
  Card,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  Stack,
} from '@mui/material';
import { CommonItemAtom } from '../../atoms/common-item/common-item.atom';
import { IconButtonAtom } from '../../atoms/icon-button/icon-button.atom';

import Avatar from 'apps/main/src/assets/images/default-avatar.png';
import { useEffect, useRef, useState } from 'react';

type Props = {};

export function SearchButtonMolecule({}: Props) {
  const [isDisplaySearchBox, setIsDisplaySearchBox] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLAnchorElement | null>(null);

  const displaySearchBox = () => setIsDisplaySearchBox(true);

  const hideSearchBox = () => setIsDisplaySearchBox(false);

  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (
        !searchBoxRef.current?.contains(e.target) &&
        !searchButtonRef.current?.contains(e.target)
      ) {
        hideSearchBox();
      }
    };

    if (isDisplaySearchBox) {
      window.addEventListener('click', handleClickOutSide);
    }

    return () => {
      window.removeEventListener('click', handleClickOutSide);
    };
  }, [isDisplaySearchBox]);

  return (
    <>
      <IconButtonAtom onClick={displaySearchBox} ref={searchButtonRef}>
        <Search />
      </IconButtonAtom>

      {isDisplaySearchBox && (
        <Card ref={searchBoxRef} className="search-box">
          <Stack direction="row">
            <IconButton onClick={hideSearchBox}>
              <ArrowBack />
            </IconButton>

            <InputBase placeholder="Tìm kiếm" className="search-input" />
          </Stack>

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <CommonItemAtom title="test" image={Avatar} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <CommonItemAtom title="test" image={Avatar} />
              </ListItemButton>
            </ListItem>
          </List>
        </Card>
      )}

      <style global jsx>
        {`
          .search-box {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1;
            max-width: 320px;
            min-width: 300px;
            padding: 8px 16px;
          }

          .search-input {
            background-color: #f0f2f5;
            flex: 1;
            margin-left: 4px;
            padding: 0 10px;
            border-radius: 50px;
            font-size: 16px;
            color: #606770;
          }
        `}
      </style>
    </>
  );
}
