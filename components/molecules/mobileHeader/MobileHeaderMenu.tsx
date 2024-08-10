"use client";

// constant
import PageConst from "../../../constants/PageConst";
// component
import { useState, useRef } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Grow,
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  IconButton,
} from "@mui/material";

const MobileHeader = () => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="ナビゲーションメニュー"
        aria-haspopup="true"
        onClick={toggleMenu}
        ref={anchorEl}
      >
        <MenuIcon className="text-gray-800" />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        placement="bottom-end"
        transition
        disablePortal={true}
        className="z-10"
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} className="origin-top-right">
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList role="menu">
                  <nav>
                    {PageConst.pageList?.map((page) => (
                      <Link
                        key={page}
                        href={page === "home" ? "/" : `/${page}`}
                        className="text-gray-800 hover:text-gray-800"
                      >
                        <MenuItem onClick={handleClose}>
                          {page.charAt(0).toUpperCase() + page.slice(1)}
                        </MenuItem>
                      </Link>
                    ))}
                  </nav>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default MobileHeader;
