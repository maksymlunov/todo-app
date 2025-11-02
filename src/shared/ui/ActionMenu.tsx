import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, type FC, type ReactNode } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type ActionMenuOption = { action: () => void; label: string; icon?: ReactNode };

type ActionMenuProps = {
  options: ActionMenuOption[];
};

export const ActionMenu: FC<ActionMenuProps> = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} title="Menu">
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {options.map(({ action, label, icon }) => (
          <MenuItem key={label} onClick={action}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
