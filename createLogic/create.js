const es = require('enquirer');
const path = require('path');
const fsExtra = require('fs-extra');
const { uuidv4 } = require('uuid');
const PublicGoogleSheetsParser = require('public-google-sheets-parser');
const axios = require('axios');
const sharp = require('sharp');

const spreadsheetId = '1AhdqEuW8M2YYshzdG2ypK8gIybWfUiFU-VkayL6dQ14';
const parser = new PublicGoogleSheetsParser(spreadsheetId);
const jsonUrl = `${__dirname}/../src/API/data.json`;

const question = async () => {
	const typeCreate = await es.prompt({
		type: 'autocomplete',
		name: 'fromDoc',
		message: 'LP from Google Docs?',
		choices: [ 'Yes', 'No, create new', 'More then ...', '...' ]
	});

	if (typeCreate.fromDoc === 'Yes') {
		return es.prompt({
			type: 'input',
			name: 'numberTemplateFromDoc',
			message: 'Past number string in Google Doc',
		});
	} else if (typeCreate.fromDoc === 'More then ...') {
		return es.prompt({
			type: 'input',
			name: 'numberTemplateFromDocMoreThan',
			message: 'Past number string in Google Doc => rebuild',
		});
	} else if (typeCreate.fromDoc === 'No, create new') {
		return es.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Name template: '
			},
			{
				type: 'autocomplete',
				name: 'prelanding',
				message: 'Has prelanding? ',
				choices: [ 'Yes', 'No' ]
			},
			{
				type: 'input',
				name: 'demo',
				message: 'Link to full img? '
			}
		]);
	} else {
		const { password } = await es.prompt({
			type: 'password',
			name: 'password',
			message: 'Password?'
		});
		if (password === '12345') {
			return es.prompt({
				type: 'autocomplete',
				name: 'other',
				message: 'Check',
				choices: [ 'rebuild all' ]
			});
		} else {
			throw new Error('password not correct');
		}
	}
};

const readFile = async () => {
	const pathToJson = path.resolve(jsonUrl);
	try {
		return fsExtra.readJson(pathToJson);
	} catch (e) {
		console.log(e);
	}
};

const writeFile = async (data) => {
	const pathToJson = path.resolve(jsonUrl);
	try {
		return fsExtra.writeJSON(pathToJson, data);
	} catch (e) {
		console.log(e);
	}
};

let clearedJson = false;
const updateJson = async ({ name, prelanding, preview, demo }, clearJson = undefined) => {
	const correctData = {
		id: uuidv4(),
		name: name.trim(),
		prelanding: prelanding === 'Yes',
		demo: demo.trim(),
		preview: preview.trim()
	};
	const myJson = await readFile();
	if (clearJson && !clearedJson) {
		clearedJson = true;
		myJson.length = 0;
	}
	myJson.push(correctData);
	await writeFile(myJson);
	return correctData;
};

const parseGoogle = async () => {
	return parser.parse()
		.then((items) => {
			return items;
		});
};

const downloadImg = async (linkToImg, name) => {
	try {
		const link = linkToImg.includes('.png') ? linkToImg : linkToImg + '.png';
		const input = (await axios({ url: link, responseType: 'arraybuffer' })).data;
		const linkToImgSplited = linkToImg.split('/');
		const nameFromLinkToImgSplited = linkToImgSplited[linkToImgSplited.length - 1];
		const nameSplited = nameFromLinkToImgSplited.split('.');
		const name = nameSplited[0] + 'min.' + nameSplited[1];
		await sharp(input)
			.png({ compressionLevel: 9 })
			.resize({ width: 300, height: 190, position: 'top' })
			.toFile('./min-images/' + name);
		return name;
	} catch (e) {
		return {
			error: {
				name,
				img: linkToImg
			}
		};
	}
};

const createFromNumberInDoc = async (number) => {
	const parsedGoogleItems = await parseGoogle();
	const itemFromDoc = parsedGoogleItems.find(i => i['№'] === (typeof number === 'number' ? number : Number(number)));
	if (itemFromDoc) {
		const preview = await downloadImg(itemFromDoc['Link to img'], itemFromDoc['Name template sbox']);
		const prelanding = typeof itemFromDoc.prelanding === 'number' ? 'Yes' : 'No';
		const name = typeof itemFromDoc.Name === 'string' ? itemFromDoc.Name : itemFromDoc['Name template sbox'];
		const dataToJson = {
			name,
			demo: itemFromDoc['Link to img'],
			prelanding,
			preview: 'https://lplist.info/templates/' + preview,
		};
		await updateJson(dataToJson);
	}
	return;
};

const createFromNumberInDocAndAfter = async (number) => {
	const parsedGoogleItems = await parseGoogle();
	for (const item of parsedGoogleItems) {
		if (Number(number) <= Number(item['№']) && !item['exclusive']) {
			const preview = await downloadImg(item['Link to img'], item['Name template sbox']);
			const prelanding = typeof item.prelanding === 'number' ? 'Yes' : 'No';
			const name = typeof item.Name === 'string' ? item.Name : item['Name template sbox'];
			const dataToJson = {
				name,
				demo: item['Link to img'],
				prelanding,
				preview: 'https://lplist.info/templates/' + preview,
			};
			await updateJson(dataToJson);
			console.log('added: ' + item['№'] + ' - ' + item['Name template sbox']);
		}
	}
	return;
};

const createFromNew = async (data) => {
	const preview = await downloadImg(data.demo, data.name);
	const dataToJson = {
		...data,
		preview: 'https://lplist.info/templates/' + preview,
	};
	await updateJson(dataToJson);
	// return;
};

const errorImages = [];

const rewriteAllData = async () => {
	const parsedGoogleItems = await parseGoogle();
	for (const item of parsedGoogleItems) {
		if (!item['exclusive']) {
			const preview = await downloadImg(item['Link to img'], item['Name template sbox']);
			if (typeof preview === 'string') {
				const prelanding = typeof item.prelanding === 'number' ? 'Yes' : 'No';
				const name = typeof item.Name === 'string' ? item.Name : item['Name template sbox'];
				const dataToJson = {
					name,
					demo: item['Link to img'],
					prelanding,
					preview: 'https://lplist.info/templates/' + preview,
				};
				await updateJson(dataToJson, true);
				console.log('added: ' + item['№'] + ' - ' + item['Name template sbox']);
			} else {
				console.warn('don\'t added: ' + item['№'] + ' - ' + item['Name template sbox']);
				errorImages.push(preview.error);
			}
		}
	}
};

async function init() {
	const answer = await question();
	if (answer) {
		if ('numberTemplateFromDoc' in answer) {
			await createFromNumberInDoc(answer.numberTemplateFromDoc);
		} else if ('name' in answer) {
			await createFromNew(answer);
		} else if ('numberTemplateFromDocMoreThan' in answer) {
			await createFromNumberInDocAndAfter(answer.numberTemplateFromDocMoreThan);
		} else {
			await rewriteAllData();
		}
	}
}

init()
	.then(() => {
		console.log('Success update');
		if (errorImages.length) {
			console.warn('Some templates not created', errorImages);
		}
	});
