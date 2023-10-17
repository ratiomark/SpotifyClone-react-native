import { Image, StyleSheet, View, Text } from 'react-native'
import { Track } from '../assets/types'
type TrackListItemProps = {
	track: Track

}
const TrackListItem = ({ track }: TrackListItemProps) => {
	return (
		<View style={styles.container}  >
			<Image
				style={styles.image}
				source={{ uri: track.album.images[0]?.url }}
			/>
			<View>
				<Text numberOfLines={1} ellipsizeMode='tail' style={styles.title} >{track.name}</Text>
				<Text style={styles.subtitle} >{track.artists[0]?.name ?? 'N\\A'}</Text>
			</View>
		</View>
	)
}
export default TrackListItem

const styles = StyleSheet.create({
	container: {
		// backgroundColor: 'gray',
		marginVertical: 5,
		padding: 5,
		// display: 'flex',
		flexDirection: 'row',
		gap: 10,
		width: '98%',
		alignItems: 'center'
	},
	trackData: {
		// display: 'flex',
		// gap: 10,

	},
	title: {
		color: 'white',
		fontWeight: '500',
		fontSize: 16,
		// maxWidth: '100%',
	},
	subtitle: {
		color: 'gray',
		// maxWidth: '90%',
	},
	image: {
		aspectRatio: 1,
		width: 50,
		borderRadius: 5,
	}

})