import React from 'react';
import PropTypes from 'prop-types';
import { Surface, Shape, Path, Text } from '@react-native-community/art';

import { Container } from './styles';

export default function StatusLine({ statusCode }) {
  const color = '#7d40e7';
  const backgroundColor = '#fff';
  const labelTextColor = '#999';
  const labelFont = `9px "sans-serif"`;

  return (
    <Container bgColor={backgroundColor}>
      <Surface width={290} height={40} style={{ backgroundColor }}>
        <Shape
          d={new Path()
            .move(20, 7)
            .arc(10, 0, 5, 5)
            .moveTo(20, 7)
            .counterArc(10, 0, 5, 5)}
          stroke={color}
          strokeWidth={1}
          fill={color}
        />
        <Text font={labelFont} fill={labelTextColor} x={1} y={15}>
          Aguardando
        </Text>
        <Text font={labelFont} fill={labelTextColor} x={10} y={27}>
          Retirada
        </Text>
        <Shape
          d={new Path().move(30, 7).line(110, 0)}
          stroke={color}
          strokeWidth={1}
        />
        <Shape
          d={new Path()
            .move(140, 7)
            .arc(10, 0, 5, 5)
            .moveTo(140, 7)
            .counterArc(10, 0, 5, 5)}
          stroke={color}
          strokeWidth={1}
          fill={statusCode === 1 || statusCode === 2 ? color : backgroundColor}
        />
        <Text font={labelFont} fill={labelTextColor} x={128} y={20}>
          Retirada
        </Text>
        <Shape
          d={new Path().move(150, 7).line(110, 0)}
          stroke={color}
          strokeWidth={1}
        />
        <Shape
          d={new Path()
            .move(260, 7)
            .arc(10, 0, 5, 5)
            .moveTo(260, 7)
            .counterArc(10, 0, 5, 5)}
          stroke={color}
          strokeWidth={1}
          fill={statusCode === 2 ? color : backgroundColor}
        />
        <Text font={labelFont} fill={labelTextColor} x={245} y={20}>
          Entregue
        </Text>
      </Surface>
    </Container>
  );
}

StatusLine.propTypes = {
  statusCode: PropTypes.number.isRequired,
};
