import { Text, StyleSheet, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayerContext } from '../providers/PlayerProvider';
import React, { useEffect, useState } from 'react';
import { AVPlaybackStatus, Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

const Player = () => {
	const [sound, setSound] = useState<Sound>()
	const [isLoading, setIsLoading] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const { track } = usePlayerContext()


	useEffect(() => {
		if (track) {
			playTrack()
		}
	}, [track])

	useEffect(() => {
		return sound
			? () => {
				sound.unloadAsync()
			}
			: undefined
	}, [sound])

	const playTrack = async () => {
		if (!track?.preview_url) return

		// Unload the previous track from memory
		if (sound) {

			await sound.unloadAsync()
		}

		const { sound: newSound } = await Audio.Sound.createAsync({
			uri: track.preview_url
		})
		// update the sound state 
		newSound.setOnPlaybackStatusUpdate(onPlayBackStatusUpdate)
		setSound(newSound)
		await newSound.playAsync()
	}

	const onPlayBackStatusUpdate = (status: AVPlaybackStatus) => {
		// { "androidImplementation": "SimpleExoPlayer", "audioPan": 0, "didJustFinish": false, "durationMillis": 29753, "isBuffering": false, "isLoaded": true, "isLooping": false, "isMuted": false, "isPlaying": false, "playableDurationMillis": 29753, "positionMillis": 1516, "progressUpdateIntervalMillis": 500, "rate": 1, "shouldCorrectPitch": false, "shouldPlay": false, "uri": "/mp3-preview/f197464a3ec04a490ef25feacf7d61205ccb9c84", "volume": 1 }

		if (!status.isLoaded) {
			setIsLoading(true)
			return
		}
		setIsLoading(false)
		// if (status.isPlaying) {
		setIsPlaying(status.isPlaying)
		// } else {
		// setIsPlaying(false)
		// }

	}


	const onPlayPause = async () => {
		if (!sound) return

		// if (sound._()) {
		if (isPlaying) {
			await sound.pauseAsync()
 
		} else {
			await sound.playAsync()
		}
	}



	if (!track) {
		return null;
	}

	const image = track.album.images?.[0];

	return (
		<View style={styles.container}>
			<View style={styles.player}>
				{image && <Image source={{ uri: image.url }} style={styles.image} />}

				<View style={{ flex: 1, gap: 3 }}>
					<Text numberOfLines={1} style={styles.title}>{track.name}</Text>
					<Text numberOfLines={1} style={styles.subtitle}>{track.artists[0]?.name}</Text>
				</View>

				<Ionicons
					name={'heart-outline'}
					size={20}
					color={'white'}
					style={{ marginHorizontal: 10 }}
				/>
				<Ionicons
					onPress={onPlayPause}
					disabled={!track?.preview_url}
					// name={'play'}
					name={isPlaying ? 'pause' : 'play'}
					// name={'warning'}
					size={22}
					color={track?.preview_url ? 'white' : 'gray'}
				// onPress={}
				/>
			</View>
		</View>
	);
};

export default Player;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: '100%',
		top: -75,
		height: 75,
		padding: 10,
	},
	player: {
		backgroundColor: '#286660',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
		padding: 3,
		paddingRight: 15,
	},
	title: {
		color: 'white',
	},
	subtitle: {
		color: 'lightgray',
		fontSize: 12,
	},
	image: {
		height: '100%',
		aspectRatio: 1,
		marginRight: 10,
		borderRadius: 5,
	},
});
