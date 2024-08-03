"use client";

import { useState, useRef } from "react";
// type
import CategoryType from "../../../types/CategoryType";
// component
import {
  MenuItem,
  MenuList,
  IconButton,
  Paper,
  Grow,
  Popper,
  ClickAwayListener,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Link from "next/link";

interface CategoryFilterProps {
  categoryList: CategoryType[] | null;
}

const CategoryFilter = ({ categoryList }: CategoryFilterProps) => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="記事カテゴリーフィルター"
        aria-haspopup="true"
        onClick={handleClick}
        title="記事カテゴリー"
        ref={anchorEl}
      >
        <FilterListIcon className="text-gray-800" />
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
          <Grow
            {...TransitionProps}
            className="origin-bottom-left lg:origin-top-right"
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList role="menu">
                  <MenuItem
                    key="category"
                    className="text-gray-800 pointer-events-none"
                  >
                    Blog Category
                  </MenuItem>
                  <nav>
                    {categoryList?.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/blog/category/${category.slug}`}
                        className="text-gray-800 hover:text-gray-800"
                      >
                        <MenuItem onClick={handleClose} className="font-light">
                          {category.name}
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

export default CategoryFilter;
