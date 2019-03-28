# Configuration

### config.json

```json
{
	"v1": {
		"mode": "set", // 'set' or 'random'
		"setContent": {
			"type": "link", // 'link', 'image', 'pdf', or 'audio'
			"url": "https://www.youtube.com/watch?v=bybfO8OnORA", // Required if type is 'link'
			"assetUrl": null, // Required if type isn't 'link'
			"newTab": true // Open in new tab. true or false
		},
		"randomContent": [
			{
				"type": "link",
				"assetUrl": null,
				"url": "https://www.youtube.com/watch?v=bybfO8OnORA",
				"newTab": true
			},
			{
				"type": "image",
				"assetUrl": "/media/gashlycrumb-tinies.pdf",
				"url": "https://www.youtube.com/watch?v=ro0DCOxxG18",
				"newTab": true
			}
		]
	},
	"v2": {
		"mode": "random",
		"setContent": {
			"type": "image",
			"assetUrl": null,
			"url": null,
			"newTab": true
		},
		"randomContent": [
			{
				"type": "image",
				"assetUrl": "/media/photo.jpg",
				"url": null,
				"newTab": true
			},
			{
				"type": "image",
				"assetUrl": "/media/Untitled.png",
				"url": "https://www.google.com",
				"newTab": false
			},
			{
				"type": "pdf",
				"assetUrl": "/media/gashlycrumb-tinies.pdf",
				"url": null,
				"newTab": true
			}
		]
	},
	"v3": {
		"mode": "random",
		"setContent": {
			"type": "link",
			"url": "https://www.youtube.com/watch?v=bybfO8OnORA",
			"newTab": false
		},
		"randomContent": [
			{
				"type": "link",
				"assetUrl": null,
				"url": "http://covers.i-d.co/",
				"newTab": true
			},
			{
				"type": "link",
				"assetUrl": null,
				"url": "http://9-eyes.com/",
				"newTab": true
			},
			{
				"type": "link",
				"assetUrl": null,
				"url": "https://www.youtube.com/watch?v=yk7IDVzLiQo",
				"newTab": true
			}
		]
	}
}
```
