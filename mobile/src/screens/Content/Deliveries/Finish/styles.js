import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px 20px 15px;

  border-top-width: 90px;
  border-top-color: #7d40e7;
`;

export const CameraContainer = styled.View`
  flex: 1;
  margin-top: -90px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #000;

  align-items: center;
  justify-content: center;
`;

export const TopMessageContainer = styled.View`
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 90%;
  background-color: #0005;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;
export const BottomMessageContainer = styled.View`
  position: absolute;
  z-index: 999;
  top: 0;
  right: 90%;
  bottom: 0;
  left: 0;
  background-color: #0005;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
export const MessageText = styled.Text`
  position: absolute;
  transform: translate(205px, 140px) rotate(90deg);
  width: 300px;
  color: #fff;
  font-size: 12px;
`;
