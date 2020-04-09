import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px 20px 0;

  border-top-width: 90px;
  border-top-color: #7d40e7;
`;

export const Title = styled.Text`
  align-self: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;

  margin-top: -90px;
  margin-bottom: 10px;
  background-color: #7d40e7;
`;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;

  background-color: #fff;
  border-radius: 4px;
`;

export const Problem = styled.View.attrs({
  elevation: 1,
})`
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;

  flex-direction: row;
  align-items: center;
`;

export const ProblemDescription = styled.Text`
  flex: 3;
  font-size: 16px;
  color: #999;

  text-align: justify;
`;

export const ProblemDate = styled.Text`
  flex: 1;
  font-size: 12px;
  color: #c1c1c1;

  text-align: right;
`;

export const NoContentMessage = styled.Text`
  margin-top: 50px;
  align-self: center;
  font-size: 12px;
  font-weight: normal;
  font-style: italic;
  color: #666;
`;
