import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { baseCats } from './cats';
import { getExpected, calculateNewRating } from './elo';
import { Cat, Match } from './models';
import * as cors from 'cors';
const corsHandler = cors({ origin: true });
const firestore = admin.initializeApp(functions.config()).firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
const db = firestore;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const startMatch = functions.https.onRequest((request, response) => {
	corsHandler(request, response, async () => {
		const data: any = await db.collection('cats').get();

		const cats: Array<Cat> = data.docs.map((doc: { data: () => Cat; id: string }) => {
			return {
				...doc.data(),
				ref: doc.id
			};
		});

		const getRandomCat = () => {
			const randomIndex = Math.floor(Math.random() * cats.length);
			const cat = cats.splice(randomIndex, 1)[0];
			return cat;
		};

		const cat1: any = getRandomCat();
		const cat2: any = getRandomCat();

		const match = {
			cat1: { ...cat1 },
			cat2: { ...cat2 }
		};

		const { id } = await db.collection('matchs').add(match);

		response.json({ ...match, id });
	});
});

export const matchResult = functions.https.onRequest(async (request, response) => {
	corsHandler(request, response, async () => {
		const { matchId, winner } = request.body;

		const matchResponse: any = await db.collection('matchs').doc(matchId).get();

		const match: Match = { ...matchResponse.data() };

		const { cat1, cat2 } = match;

		const cat1Ref = db.collection('cats').doc(cat1.ref);
		const cat2Ref = db.collection('cats').doc(cat2.ref);

		const batch = await db
			.batch()
			.set(cat1Ref, {
				...cat1,
				elo: calculateNewRating({ ...cat1, projectedElo: getExpected(cat1.elo, cat2.elo) }, cat1.id === winner)
			})
			.set(cat2Ref, {
				...cat2,
				elo: calculateNewRating({ ...cat2, projectedElo: getExpected(cat2.elo, cat1.elo) }, cat2.id === winner)
			})
			.commit();

		response.json(batch);
	});
});

export const populateCats = functions.https.onRequest(async (request, response) => {
	const operations = baseCats.map((cat) => {
		return db.collection('cats').add({ ...cat, elo: 1300 });
	});

	const allCats = await Promise.all(operations);
	response.json(allCats);
});
