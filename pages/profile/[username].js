import ProfileImages from "../../components/ProfileImages";
import ProfileStats from "../../components/ProfileStats";
import TimelineSort from "../../components/TimelineSort";
import ProfileInfo from "../../components/ProfileInfo";
import Layout from "../../components/Layout";
import formatNumber from "../../utils/numbers";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState, useReducer, useMemo, useRef } from "react";
import { unionBy } from "lodash";
import Head from "next/head";
import axios from "axios";
import { getAnalysisData } from "../../utils/analysisData";
import { calculateEngagement } from "../../utils/calculateEngagement";
import { profileData } from "../../utils/db/profileData";
import { removeEmojis } from "utils/removeEmojis";
import { getFromKV, uploadToKV } from "utils/kv";

const ACTIONS = {
  REFRESH: "REFRESH",
  EXTEND_TIMELINE: "EXTEND_TIMELINE",
  SORT_TIMELINE: "SORT_TIMELINE",
  UPDATE_STATISTICS: "UPDATE_STATISTICS",
};

const sortBy = (timeline = [], sort, ascending) => {
  if (timeline.length == 0) return;

  const array = ascending
    ? timeline.sort((a, b) => a[sort] - b[sort])
    : timeline.sort((a, b) => b[sort] - a[sort]);
  return array;
};

export default function Profile({ user, firstEntry = false, error = false }) {
  const timelineDiv = useRef(null);

  const reducer = (profile, update) => {
    switch (update.action) {
      case "REFRESH": {
        const nodes = unionBy(profile.nodes, update.user.nodes, "id");

        return {
          ...update.user,
          nodes,
          timeline: update.user.nodes,
          timeRanges: {
            new: nodes[0].date,
            old: nodes[nodes.length - 1].date,
          },
        };
      }

      case "UPDATE_STATISTICS": {
        return {
          ...profile,
          ...update.data,
          engagementRate: calculateEngagement(
            update.data.total_likes,
            update.data.total_comments,
            profile.follower
          ),
        };
      }
      case "EXTEND_TIMELINE": {
        const nodes = unionBy(profile.nodes, update.user.nodes, "id");
        return {
          ...profile,
          nodes,
          timeline: sortBy(
            [...profile.timeline, ...update.user.nodes],
            update.sort,
            update.ascending
          ),
          next: update.user.next,
          next_chunk: update.user.next_chunk,
          timeRanges: {
            new: nodes[0].date,
            old: nodes[nodes.length - 1].date,
          },
        };
      }
      case "SORT_TIMELINE": {
        return {
          ...profile,
          timeline: sortBy(profile.timeline, update.sort, update.ascending),
        };
      }
      default: {
        return profile;
      }
    }
  };

  const [updateStats, setUpdateStats] = useState(false);

  const [batch, setBatch] = useState(1);
  const [end, setEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sort, setSort] = useState("id");
  const [ascending, setAscending] = useState(false);

  const [profile, dispatch] = useReducer(reducer, user);

  const analysisData = useMemo(
    () => getAnalysisData(profile.nodes),
    [profile.nodes]
  );

  useEffect(() => {
    dispatch({
      action: ACTIONS.UPDATE_STATISTICS,
      data: {
        total_likes: analysisData.total_likes,
        total_comments: analysisData.total_comments,
        days: analysisData.days,
        hours: analysisData.hours,
        tags: analysisData.tags,
        hashtags: analysisData.hashtags,
        locations: analysisData.locations,
      },
    });
  }, [updateStats]);

  useEffect(() => {
    dispatch({
      action: ACTIONS.SORT_TIMELINE,
      sort,
      ascending,
    });
  }, [sort, ascending]);

  if (profile) {
    return (
      <Layout showSearch={true} showGreySearch={true}>
        <Head>
          <title>
            {profile.full_name} (@{profile.username}) Instagram profile with
            posts and videos
          </title>
          <meta
            key="description"
            name="description"
            content={`View Instagram posts, pictures and videos of ${
              profile.full_name
            } (@${profile.username}) - ${formatNumber(
              profile.follower
            )} follower, ${formatNumber(
              profile.following
            )} following, ${formatNumber(profile.post_amount)} posts`}
          />
          <meta
            key="og:title"
            property="og:title"
            content={`${profile.full_name} (@${profile.username}) Instagram profile with posts and videos`}
          />
          <meta
            key="og:description"
            property="og:description"
            content={`View Instagram posts, pictures and videos of ${
              profile.full_name
            } (@${profile.username}) - ${formatNumber(
              profile.follower
            )} follower, ${formatNumber(
              profile.following
            )} following, ${formatNumber(profile.post_amount)} posts`}
          />
          <meta
            key="og:image"
            property="og:image"
            content={profile.profile_pic_url}
          />
          <link
            rel="canonical"
            href={`https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/profile/${profile.username}`}
          />
        </Head>

        <ProfileInfo user={profile} />

        <ProfileStats data={profile} />

        {profile.nodes.length > 0 && (
          <div className="d-flex w-100 position-relative">
            <div id="timelineBackground"></div>
            <div className="profileTimeline" ref={timelineDiv}>
              {profile.timeline?.length > 0 && (
                <>
                  <TimelineSort
                    setType={(type) => setSort(type)}
                    setOrder={(ascending) => setAscending(ascending)}
                    ascending={ascending}
                    type={sort}
                  />

                  <ProfileImages
                    timeline={profile.timeline}
                    type="profile"
                    props={{
                      username: profile.username,
                      follower: profile.follower,
                    }}
                  />
                </>
              )}

              {loading ? (
                <Spinner
                  animation="border"
                  variant="info"
                  className="mx-auto mt-5 d-block"
                />
              ) : profile.next ? (
                <button
                  className="btn my-4 p-2 loadMore"
                  onClick={loadMore}
                  type="button"
                >
                  Load More
                </button>
              ) : !firstEntry ? (
                <>
                  <button
                    className="btn my-4 p-1 loadMore"
                    onClick={refresh}
                    type="button"
                  >
                    Load more
                  </button>
                </>
              ) : (
                <p>{end}</p>
              )}
            </div>
          </div>
        )}
      </Layout>
    );
  } else if (error === "private") {
    return (
      <Layout showSearch={true}>
        <Head>
          <title>
            {profile.full_name} (@{profile.username}) Instagram profile with
            posts and videos
          </title>
          <meta
            key="description"
            name="description"
            content={`View Instagram posts, pictures and videos of ${
              profile.full_name
            } (@${profile.username}) - ${formatNumber(
              profile.follower
            )} follower, ${formatNumber(
              profile.following
            )} following, ${formatNumber(profile.post_amount)} posts`}
          />
          <meta
            key="og:title"
            property="og:title"
            content={`${profile.full_name} (@${profile.username}) Instagram profile with posts and videos`}
          />
          <meta
            key="og:description"
            property="og:description"
            content={`View Instagram posts, pictures and videos of ${
              profile.full_name
            } (@${profile.username}) - ${formatNumber(
              profile.follower
            )} follower, ${formatNumber(
              profile.following
            )} following, ${formatNumber(profile.post_amount)} posts`}
          />
          <meta
            key="og:image"
            property="og:image"
            content={profile.profile_pic_url}
          />
          <link
            rel="canonical"
            href={`https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/profile/${profile.username}`}
          />
        </Head>

        <ProfileInfo user={user} />
        <div className="container-lg profileTimeline text-center">
          <div className="spacer"></div>
          <p className="mt-5 text-center">Privates Profil.</p>
          <svg
            className="lock bi bi-lock"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            width="40"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
          </svg>
        </div>
      </Layout>
    );
  }
}

export async function getStaticProps({ params }) {
  let { username } = params;
  username = removeEmojis(username);

  // first kv check
  let user = await getFromKV("profile", username);

  if (user) {
    console.info("user from kv");
    if (user.is_private) {
      return {
        props: {
          user,
          error: "private",
        },
        revalidate: 84600,
      };
    }

    return {
      props: {
        user,
      },
      revalidate: 600,
    };
  }

  try {
    user = await profileData(username);

    if (user !== null && user.id !== null) {
      if (user.is_private) {
        return {
          props: {
            user,
            error: "private",
          },
          revalidate: 84600,
        };
      }

      user = {
        ...user,
        hash: "",
        timeline:
          user?.nodes?.slice(0, 24).map((node) => {
            return {
              ...node,
              caption: JSON.parse(node.caption),
            };
          }) ?? [],
        timeRanges: {
          new: user.nodes?.[0]?.date ?? "",
          old: user.nodes?.[user.nodes.length - 1]?.date ?? "",
        },
        isDbData: true,
      };

      // upload to kv
      console.time("create kv data", username);
      await uploadToKV({
        type: "profile",
        key: username,
        value: user,
      });
      console.timeEnd("create kv data", username);

      return {
        props: {
          user,
        },
        revalidate: 600,
      };
    }
  } catch (err) {
    console.error("err:", err);
    return {
      notFound: true,
      revalidate: 84600,
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
