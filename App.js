import React, { PureComponent } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { LevelOne } from "./src/entities/entities";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GameEngine
        ref={"engine"}
        style={styles.game}
        systems={[]}
        entities={LevelOne()}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  game: {
    backgroundColor: "#000"
  }
});