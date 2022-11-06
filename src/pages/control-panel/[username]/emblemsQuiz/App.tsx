import './App.css';
import { Box } from './Box';
import { Flex } from './Flex';

function App() {
  return (
    <div className="App">
      <h1>Basic flexbox</h1>
      <Flex
        padding={3}
        bgColor="pink"
        height="200px"
        container
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Box bgColor="green" />
        <Box width="200px" />
        <Box bgColor="orange" />
      </Flex>

      <h1>Flex, Flex Grow, Flex Basis, Flex Shrink</h1>
      <Flex
        alignItems="center"
        justifyContent="space-around"
        container
        bgColor="gray"
        margin={[0, 0, 0, 5]}
      >
        <Flex flex="10 2 400px">
          <Box width="auto" height="300px" bgColor="red" />
        </Flex>
        <Flex flexGrow={1} flexShrink={1} flexBasis="400px">
          <Box width="auto" />
        </Flex>
        <Flex flexGrow={1} flexShrink={1} flexBasis="400px">
          <Box width="auto" />
        </Flex>
        <Flex flexGrow={1} flexShrink={1} flexBasis="400px">
          <Box width="auto" />
        </Flex>
        <Flex alignSelf="end" flexGrow={1} flexShrink={1} flexBasis="400px">
          <Box width="auto" />
        </Flex>
      </Flex>

      <h1>Pushing Away</h1>

      <Flex container>
        <Flex margin={0.5}>
          <Box bgColor="green" />
        </Flex>
        <Flex margin={0.5}>
          <Box bgColor="green" />
        </Flex>
        <Flex margin={0.5}>
          <Box bgColor="green" />
        </Flex>
        <Flex pushRight margin={0.5}>
          <Box bgColor="red" />
        </Flex>
        <Flex margin={0.5}>
          <Box bgColor="red" />
        </Flex>
      </Flex>

      <h1>Pushed column</h1>
      <Flex container direction="column" height="500px">
        <Flex>
          <Box />
        </Flex>
        <Flex>
          <Box />
        </Flex>
        <Flex pushDown>
          <Box bgColor="red" />
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
