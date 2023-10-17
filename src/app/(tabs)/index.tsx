import { FlatList, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';

export default function TabOneScreen() {
	return (
		<View style={styles.container}>
			{/* <FlatList data={tracks}
				renderItem={({ item }) => <Text>{item.name}</Text>}
			/> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

});
