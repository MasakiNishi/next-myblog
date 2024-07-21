"use client";

import { useState, useRef } from "react";
// component
import {
  MenuItem,
  MenuList,
  IconButton,
  Paper,
  Grow,
  ClickAwayListener,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Popper } from "@mui/material";
import Link from "next/link";

interface CategoryFilterProps {
  categories: string[];
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="記事カテゴリーフィルター"
        aria-haspopup="true"
        onClick={handleClick}
        title="記事カテゴリー"
        ref={anchorEl}
        className="text-gray-800"
      >
        <FilterListIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        placement="bottom-end"
        transition
        disablePortal={true}
        style={{ zIndex: 10 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "0 0 0" }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList role="menu">
                  <Link
                    key="category"
                    href="/blog"
                    className="text-gray-800 hover:text-gray-800"
                  >
                    <MenuItem onClick={handleClose}>Category</MenuItem>
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category}`}
                      className="text-gray-800 hover:text-gray-800"
                    >
                      <MenuItem onClick={handleClose} className="font-light">
                        {category}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default CategoryFilter;
