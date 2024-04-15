// // Google Drive API settings google clud console
 const API_KEY = 'AIzaSyDwTn9b_RIqfktz2ObJ47R-o7phkbCdiNU';  // Replace with your Google Drive API key
 const FOLDER_ID = '1AnxEWsfmIkTgDMaeoTueVYEmngoZo0vF';  // Replace with your Google Drive folder ID


// Function to fetch all items in a Google Drive folder with pagination
async function getDriveFolderItems() {
    let nextPageToken = null;
    let allItems = [];

    do {
        const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&fields=nextPageToken,files(id,name)&pageSize=100${nextPageToken ? '&pageToken=' + nextPageToken : ''}&key=${API_KEY}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.files && data.files.length > 0) {
                const items = await Promise.all(data.files.map(async file => {
                    const fileDetailsUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?fields=webViewLink&key=${API_KEY}`;
                    const fileDetailsResponse = await fetch(fileDetailsUrl);
                    const fileDetailsData = await fileDetailsResponse.json();

                    // return 
                        // name: file.name,
                        // link: fileDetailsData.webViewLink.slice(32,-18)
                       return  fileDetailsData.webViewLink.slice(32,-18)       //for only link ;
                }));

                allItems = [...allItems, ...items];
            }

            nextPageToken = data.nextPageToken;

        } catch (error) {
            console.error('Error fetching Google Drive folder items:', error);
            break;
        }
    } while (nextPageToken);

    return allItems;
}

// Function to display folder items
async function displayFolderItems() {
    const items = await getDriveFolderItems();
    let c=1
    if (items.length > 0) {
        console.log(items)
        // items.forEach(item => {
        //     // console.log(`${c}  Name: ${item.name}, Link: ${item.link}`);
        //     console.log(`${c}   Link: ${item.link}`);
        //     c=c+1
        // });
    } else {
        console.log('No items to display.');
    }
}

// Call function to display folder items
displayFolderItems();

// module.exports = getDriveFolderItems;