import './CardContent.css';
import EMailImg from '/icons/EmLogo.png';
import GHubImg from '/icons/GhLogo.png';
import TGImg from '/icons/TgLogo.png';

import { CardContentProps } from '../../types/interfaces';

function CardContent(props: CardContentProps) {
  const { onClick, avatar, name, GHLink, EMLink, TGLink } = props;

  return (
    <div className="author_card" onClick={onClick}>
      <div className="author_card-back card-back">
        <div className="card-back__title">My contacts</div>
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
                Link to github
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="author_card-front card">
        <div className="card__line">
          <div className="card__content">
            <div className="card__content_name">{name}</div>
            <div className="card__content_description">Junior Frontend Developer</div>
            <div className="card__content_about">I am open to work! Click on card to find me!</div>
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
