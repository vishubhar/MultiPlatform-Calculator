import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
  useColorScheme,
} from 'react-native';

export default function App() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const colorScheme = useColorScheme();

  const buttons = [
    'AC',
    '+/-',
    '%',
    '÷',
    '7',
    '8',
    '9',
    '×',
    '4',
    '5',
    '6',
    '−',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '=',
  ];

  const handleInput = buttonPressed => {
    if (
      buttonPressed === '+' ||
      buttonPressed === '−' ||
      buttonPressed === '×' ||
      buttonPressed === '÷'
    ) {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      return;
    }
    switch (buttonPressed) {
      case 'AC':
        setCurrentNumber('');
        setLastNumber('');
        return;
      case '+/-':
        setCurrentNumber((currentNumber * -1).toString());
        return;
      case '=':
        setLastNumber(currentNumber + ' = ');
        calculate();
        return;
      case '.':
        setCurrentNumber(currentNumber + buttonPressed);
        return;
      case '%':
        setCurrentNumber((currentNumber / 100).toString());
        return;
      default:
        setCurrentNumber(currentNumber + buttonPressed);
    }
  };

  const calculate = () => {
    try {
      let expression = currentNumber
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');

      if (/[\+\-\×\÷]$/.test(expression)) {
        setCurrentNumber('Error');
        return;
      }

      if (/[\+\-\×\÷]{2,}/.test(expression)) {
        setCurrentNumber('Error');
        return;
      }

      const result = eval(expression);
      if (isNaN(result) || !isFinite(result)) {
        setCurrentNumber('Error');
      } else {
        setCurrentNumber(result.toString());
      }
    } catch (error) {
      setCurrentNumber('Error');
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colorScheme === 'dark' ? '#000' : '#fff'},
      ]}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}
      />

      <View style={styles.result}>
        <Text
          style={[
            styles.historyText,
            {color: colorScheme === 'dark' ? '#fff' : '#000'},
          ]}>
          {lastNumber}
        </Text>
        <Text
          style={[
            styles.resultText,
            {color: colorScheme === 'dark' ? '#fff' : '#000'},
          ]}>
          {currentNumber}
        </Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map(button => (
          <TouchableOpacity
            key={button}
            style={[
              styles.button,
              button === '0' && {width: '48%'},
              button === 'AC' || button === '+/-' || button === '%'
                ? styles.grayButton
                : null,
              button === '÷' ||
              button === '×' ||
              button === '−' ||
              button === '+' ||
              button === '='
                ? styles.yellowButton
                : null,
            ]}
            onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    color: '#fff',
    fontSize: 60,
    margin: 10,
  },
  historyText: {
    color: '#7c7c7c',
    fontSize: 30,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 0 : 120,
  },
  button: {
    width: '22%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 50,
    backgroundColor: '#333',
  },
  grayButton: {
    backgroundColor: '#A5A5A5',
  },
  yellowButton: {
    backgroundColor: '#FF9500',
  },
  textButton: {
    color: '#fff',
    fontSize: 30,
  },
});
