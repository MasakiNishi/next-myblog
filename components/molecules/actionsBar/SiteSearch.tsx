"use client";

import { useState, useRef } from "react";
// component
import {
  IconButton,
  Paper,
  Grow,
  ClickAwayListener,
  Popper,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

const SiteSearch = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      document.getElementById("search-link")?.click();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <>
      <IconButton
        aria-label="ブログ内検索"
        aria-haspopup="true"
        onClick={handleClick}
        title="ブログ内検索"
        ref={anchorEl}
      >
        <SearchIcon className="text-gray-800" />
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
            <Paper className="p-2">
              <ClickAwayListener onClickAway={handleClose}>
                <div className="flex items-center">
                  <InputBase
                    placeholder="Blog Search…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    className="min-w-36 ml-2 flex-1"
                  />
                  <Link
                    id="search-link"
                    href={`/blog/search?query=${searchQuery}&page=1`}
                    className="hidden"
                  >
                    Search
                  </Link>
                  <IconButton
                    type="button"
                    aria-label="search"
                    onClick={() => {
                      document.getElementById("search-link")?.click();
                    }}
                  >
                    <SearchIcon className="text-gray-800" />
                  </IconButton>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default SiteSearch;
