import './CardContent.css';
import EMailImg from '/icons/EmLogo.png';
import GHubImg from '/icons/GhLogo.png';
import TGImg from '/icons/TgLogo.png';
import { useTranslation } from 'react-i18next';

import { CardContentProps } from '../../types/interfaces';

function CardContent(props: CardContentProps) {
  const { onClick, author, avatar, GHLink, EMLink, TGLink } = props;

  const { t } = useTranslation();

  return (
    <div className="author_card" onClick={onClick}>
      <div className="author_card-back card-back">
        <div className="card-back__title">{t('welcomePage.authorContacts')}</div>
        <div className="card-back__contacts media-group">
          <div className="media-group__block">
            <div className="media-group__block_icon media-icon">
              <img src={EMailImg} alt="Email" className="media-icon_img" />
            </div>
            <div className="media-group__block_name">{EMLink}</div>
          </div>
          <div className="media-group__block">
            <div className="media-group__block_icon media-icon">
              <img src={TGImg} alt="Telegram" className="media-icon_img" />
            </div>
            <div className="media-group__block_name">{TGLink}</div>
          </div>
          <div className="media-group__block">
            <div className="media-group__block_icon media-icon">
              <img src={GHubImg} alt="Github" className="media-icon_img" />
            </div>
            <div className="media-group__block_name">
              <a className="media-group_link" href={GHLink} target="_blank" rel="noreferrer">
                {t('welcomePage.authorGitHub')}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="author_card-front card">
        <div className="card__line">
          <div className="card__content">
            <div className="card__content_name">{t(`welcomePage.authorName_${author}`)}</div>
            <div className="card__content_description">{t('welcomePage.authorCardTitle')}</div>
            <div className="card__content_about">{t('welcomePage.authorCardContent')}</div>
          </div>
        </div>
        <div className="card__avatar">
          <img src={avatar} alt="author avatar" className="card__avatar_img" />
        </div>
      </div>
    </div>
  );
}

export default CardContent;
