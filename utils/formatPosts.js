import { Post, Slide, Video } from '../models/Post'
import { addTags } from './tags';
const calculateEngagement = (likes, comments, follower) => Math.round( ( ( (likes + comments)/follower ) * 100)* 1e2) / 1e2 ;

function formatPosts(json) {
  const days = [0,0,0,0,0,0,0];
  const hours = new Array(24).fill(0);
  const locations = new Object();
  const tags = new Object();
  const hashtags = new Object();

  const { graphql } = json?.entry_data?.ProfilePage[0];
  if(!graphql) return {
    error: true,
    user: false,
  } 
  const { user } = graphql;
  const { 
    id,
    username, 
    full_name, 
    biography, 
    profile_pic_url, 
    profile_pic_url_hd,
    is_private,
    is_verified,
    // Deeper nested content
    edge_follow,
    edge_followed_by,
    edge_owner_to_timeline_media,
  } = user;

  const follower = edge_followed_by.count ?? 0;
  const following = edge_follow.count ?? 0;

  const { 
    count: post_amount,
    page_info,
    edges: mediaNodes,
  } = edge_owner_to_timeline_media;

  const {
    has_next_page: next = '',
    end_cursor: next_chunk,
  } = page_info;
  
  let nodes = [];
  let counter = 0;

  let total_likes = 0;
  let total_comments = 0;

  for(let mediaNode of mediaNodes) {
    let { node } = mediaNode;
    let media = new Post();
    
    if(node.__typename == 'GraphSidecar') {
      let slideArray = [];
      let slideNodes = node.edge_sidecar_to_children.edges;

      for(let slideNode of slideNodes) {
        let slide = new Slide(slideNode.node.display_url)
        if(slideNode.node.__typename == 'GraphVideo') {
          slide.video = new Video(
            slideNode.node.video_url,
            slideNode.node.video_view_count
          );
        }
        slideArray.push(slide);
      }

      media.id = counter++;
      media.is_slide = true;
      media.slideArray = slideArray;
      
    } else if (node.__typename == 'GraphVideo') {
      media.is_video = true;
      media.video = new Video(node.video_url, node.video_view_count)
    }


    media.id = counter++;
    media.display_url = node.display_url;
    media.thumbnail = node.thumbnail_src;
    media.comment_count = node.edge_media_to_comment.count ?? 0;
    media.liked = node.edge_liked_by.count ?? 0;
    media.location = node.location ?? false;

    if(media.location) {
      locations[media.location.id] === undefined
      ? locations[media.location.id] = { name: media.location.name, amount: 1}
      : locations[media.location.id].amount++;
    }


    const seconds =  node.taken_at_timestamp;
    const date = new Date(0)
    date.setUTCSeconds(seconds)

    // Weekly post data
    days[date.getUTCDay()]++;
    hours[date.getUTCHours()]++;

    media.day = date.getUTCDay();
    media.hour = date.getUTCHours();


    const month = date.toLocaleString('default', { month: 'short' });
    media.date = `${date.getUTCDate()} ${month} ${date.getUTCFullYear()}` || ''

    total_likes += media.liked
    total_comments += media.comment_count

    let caption = (node.edge_media_to_caption.edges.length > 0) && node.edge_media_to_caption.edges[0].node.text;

    if(caption.length > 0) {
      media.caption = caption
      media.link_caption = caption.replace(/@([a-zA-Z0-9]*)/g, '<a href="/profile/$1">@$1</a>')
      addTags(caption, '@', tags)
      addTags(caption, '#', hashtags)
    }

    media.engagement_rate = calculateEngagement(media.liked, media.comment_count, follower)

    nodes.push(media);
  }

  return { 
    user: {
      id,
      username,
      is_private,
      is_verified,
      full_name,
      biography,
      profile_pic_url,
      profile_pic_url_hd,
      post_amount,
      follower,
      following,
      next,
      next_chunk,
      nodes,
      total_likes,
      total_comments,
      days,
      hours,
      locations,
      tags,
      hashtags,
    }
  }

}

module.exports = { formatPosts }