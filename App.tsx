import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function App() {
  const [notification, setNotification] = React.useState("Player has to start");

  const [board, setBoard] = React.useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [refresh, setRefresh] = React.useState(false);
  const [currentPlayer, setCurrentPlayer] = React.useState("X");

  const pressField = (index: any) => {
    let newBoard = board;
    if (newBoard[index] !== "X" && newBoard[index] !== "O") {
      if (currentPlayer === "X") {
        newBoard[index] = "X";
        setCurrentPlayer("O");
        setNotification("Player X to move");
      } else {
        newBoard[index] = "O";
        setCurrentPlayer("X");
        setNotification("Player O to move");
      }
      setBoard(newBoard);
      setRefresh(!refresh);
      checkIfPlayerWon();
    }
  };
  const checkIfPlayerWon = () => {
    const winningCombinations = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        playerWon(board[a]);
        return;
      }
    }
  };

  const playerWon = async (winner: string) => {
    setNotification(`Player ${winner} won!`);
    await delay(5000);
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setNotification(`Player ${currentPlayer} to move`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.txt1}>Tic Tac Toe</Text>
      <Text style={styles.txt2}>{notification}</Text>
      <View style={styles.flatListContainer}>
        <Image  source={require("./assets/bg.png")} style={styles.image} />
        <FlatList
          style={styles.list}
          data={board}
          numColumns={3}
          refreshing={true}
          extraData={refresh}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.square}
              onPress={() => pressField(index)}
            >
              <Text
                style={styles.txtXO}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
    height:300,
    width:'100%'
  },
  txt1: {
    fontSize: 50,
    position: 'absolute',
    top: 60
  },
  txt2: {
    fontSize: 20,
    position:'absolute',
    top: 130
  },
  txtXO: {
    fontSize:60
  },
  button1: {
    width: 100,
    padding: 5,
    backgroundColor: "blue",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: 300,
    height: 400,
  },
  square: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  image:{
    width: 300,
    height: 300,
    position: 'absolute'
  }
});
