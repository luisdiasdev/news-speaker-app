# Feed Import Flow

There are two flows: one for RSS files and the other for OPML files.

## RSS Files

1. User inputs the URL of the RSS feed.
2. `FeedFile` is created with `state = CREATED`. (via Redux action)
3. `parseFeedFileSaga` is triggered (via Redux Saga).
4. Then it will download the RSS file into a folder in the user home directory. `~/.config/news-speaker-app/downloads/tmp/{feed-local-id}/{timestamp}.json`.
5. After that it will download the logo of the feed and save it besides the `.json` file above, inside a folder `images`.
6. User will be prompted to confirm the information of the feed and have the opportunity to customize the display name here.
7. If user decides to cancel the import process for the current file, we will dispatch the `removeFeedFile` action.
8. The `RemoveFeedFileSaga` is triggered (via Redux Saga).
9. All the data inside `~/.config/news-speaker-app/downloads/tmp/{feed-local-id}/` will be removed and the associated alongside any persisted state.
10. If user decides to keep this entry, we dispatch an action `UpdateFeedFile` that will update any field changed by the user as well as the state to `IMPORTED`.
11. This will trigger another saga to create a `Feed` object, that will be bound to the `FeedFile` via the `localFeedId`.
