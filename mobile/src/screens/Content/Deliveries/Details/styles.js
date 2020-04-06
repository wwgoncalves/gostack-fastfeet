import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px 20px 0;

  border-top-width: 90px;
  border-top-color: #7d40e7;
`;

export const ContentAndActions = styled.ScrollView`
  flex: 1;
  /* padding: 0; */

  margin-top: -90px;
  background-color: #fff;
  border-radius: 4px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
export const HeadingText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #7d40e7;
  margin-left: 10px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #999;
  text-transform: uppercase;
  margin-bottom: 2px;
`;
export const Value = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: #666;
  margin-bottom: 10px;
  text-align: justify;
`;
export const NoValue = styled.Text`
  font-size: 12px;
  font-weight: normal;
  font-style: italic;
  color: #666;
  margin-bottom: 10px;
`;

export const InformationContainer = styled.View.attrs({
  elevation: 1,
})`
  padding: 10px 15px 5px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 4px;
`;
export const InformationHeaderIcon = styled(Icon).attrs({
  name: 'local-shipping',
  size: 20,
  color: '#7d40e7',
})``;

export const StatusContainer = styled.View.attrs({
  elevation: 1,
})`
  padding: 10px 15px 5px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 4px;
`;
export const StatusHeaderIcon = styled(Icon).attrs({
  name: 'event',
  size: 20,
  color: '#7d40e7',
})``;
export const DatesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const DateContainer = styled.View`
  flex-direction: column;
`;

export const ActionsContainer = styled.View.attrs({
  elevation: 1,
})`
  flex-direction: row;
  border-radius: 4px;
  background-color: #f8f9fd;

  margin-bottom: 5px;
`;
export const Separator = styled.View`
  border: 0;
  width: 1px;
  background-color: #eee;
`;
export const ActionButton = styled(RectButton)`
  flex: 1;
  padding: 10px 20px;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;
export const PickupIcon = styled(Icon).attrs({
  name: 'archive',
  size: 22,
  color: '#40a740',
})``;
export const PickingUpIndicator = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#40a740',
})``;
export const ReportIcon = styled(Icon).attrs({
  name: 'highlight-off',
  size: 22,
  color: '#e74040',
})``;
export const ProblemsIcon = styled(Icon).attrs({
  name: 'info-outline',
  size: 22,
  color: '#e7ba40',
})``;
export const FinishIcon = styled(Icon).attrs({
  name: 'check-circle',
  size: 22,
  color: '#7d40e7',
})``;
export const ActionButtonLabel = styled.Text`
  font-size: 12px;
  font-weight: normal;
  color: #999;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
