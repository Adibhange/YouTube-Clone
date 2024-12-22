import { Link } from "react-router-dom";

const CreateChannel = () => {
  return (
    <section className="container mx-auto my-4 w-1/2 space-y-4 rounded-xl bg-foreground p-4">
      <h1 className="text-center text-3xl font-bold">Create Channel</h1>

      <form className="mx-auto w-1/2 space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-xl">Channel Name:</label>
          <input
            type="name"
            id="channelName"
            name="channelName"
            placeholder="Enter your channel name"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter your channel description"
            className="rounded-lg bg-background p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Channel Banner:</label>
          <input
            type="file"
            id="channelBanner"
            name="channelBanner"
            className="rounded-lg bg-background p-2 file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-1 focus:ring-blue-500"
            accept="image/*"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Channel Avatar:</label>
          <input
            type="file"
            id="channelAvatar"
            name="channelAvatar"
            className="rounded-lg bg-background p-2 file:rounded-md file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-copy focus:outline-none focus:ring-1 focus:ring-blue-500"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff3533] p-2 text-white transition-colors duration-300 hover:bg-[#ff0200]"
        >
          Create Channel
        </button>
      </form>
    </section>
  );
};

export default CreateChannel;
