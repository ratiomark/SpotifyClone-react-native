import { FlatList, Image, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { tracks } from '../../assets/data/tracks';
import TrackListItem from '../../components/TrackListItem';

export default function FavoritesScreen() {
	return (
		<View style={styles.container}>
			<FlatList data={tracks}
				renderItem={({ item }) => (
					<View>
						<TrackListItem track={item} />
					</View>
				)}
			/>
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
