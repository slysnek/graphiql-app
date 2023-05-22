import { useState } from 'react';
import CardContent from './CardContent';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import './SimpleUserCard.css';

import { SimpleUserCardProps } from '../../types/interfaces';

function SimpleUserCard(props: SimpleUserCardProps) {
  const [showBack, setShowBack] = useState(false);

  const { t } = useTranslation();

  const { author, avatar, name, GHLink, EMLink, TGLink, positionAvatar, positionContent } = props;

  return (
    <div className="author-block">
      <h4 className="author__name">{name}</h4>
      <p className={`author__content ${positionContent}_content`}>
        {t(`welcomePage.author_${author}`)}
      </p>
      <div className={`author__card ${positionAvatar}_card`}>
        <div className="flippable-card-container ">
          <CSSTransition in={showBack} timeout={400} classNames="flip">
            <CardContent
              avatar={avatar}
              name={name}
              GHLink={GHLink}
              EMLink={EMLink}
              TGLink={TGLink}
              onClick={() => {
                setShowBack((show) => !show);
              }}
            />
          </CSSTransition>
        </div>
      </div>
    </div>
  );
}

export default SimpleUserCard;
