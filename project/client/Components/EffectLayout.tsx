import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EffectType } from '../types/effect.type';
import InteractionLayout from './InteractionLayout/InteractionLayout';

const EffectLayout = (props: EffectType) => {
  return (
    <InteractionLayout type="effect">
      {props.effect || (
        <Effect effect={'http://localhost:3000/effects/' + props.effectName + '.gif'} />
      )}
    </InteractionLayout>
  );
};

const Effect = styled.div<{ effect: string }>`
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background-image: url(${(props) => props.effect});
  background-size: 100% 100%;
`;

export default EffectLayout;
