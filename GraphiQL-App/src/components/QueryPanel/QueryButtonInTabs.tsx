import { Tooltip, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from 'react-i18next';
import { ButtonInTabsProps } from '../../types/interfaces';
import { useAppSelector } from '../../store/hooksRedux';

export const QueryButtonInTabs = ({ onClick, isPanelOpened }: ButtonInTabsProps) => {
  const queryPanelState = useAppSelector((state) => state.queryPanelState);
  const { t } = useTranslation();
  return (
    <Tooltip
      title={
        queryPanelState.isOpened
          ? t('editorPage.hideVarHeaderPanel')
          : t('editorPage.showVarHeaderPanel')
      }
    >
      <IconButton onClick={onClick}>
        {isPanelOpened ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </IconButton>
    </Tooltip>
  );
};
