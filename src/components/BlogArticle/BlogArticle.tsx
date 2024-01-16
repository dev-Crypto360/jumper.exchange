import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ShareIcon from '@mui/icons-material/Share';
import XIcon from '@mui/icons-material/X';
import {
  Box,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import type { RootNode } from '@strapi/blocks-react-renderer/dist/BlocksRenderer';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ArticleJsonSchema, JumperBanner } from 'src/components';
import { FB_SHARE_URL, LINKEDIN_SHARE_URL, X_SHARE_URL } from 'src/const';
import type { AuthorData, StrapiImageData, TagData } from 'src/types';
import { formatDate, openInNewTab, readingTime } from 'src/utils';
import {
  BlogArticleContainer,
  BlogArticleContentContainer,
  BlogArticleImage,
  BlogAuthorAvatar,
} from './BlogArticle.style';

interface BlogArticleProps {
  title: string;
  subtitle: string;
  content: RootNode[];
  tags: TagData;
  author: AuthorData;
  slug: string;
  publishedAt: string | null;
  updatedAt: string | null;
  createdAt: string;
  image: StrapiImageData;
  baseUrl: string;
}

export const BlogArticle = ({
  title,
  subtitle,
  content,
  author,
  tags,
  publishedAt,
  updatedAt,
  createdAt,
  slug,
  image,
  baseUrl,
}: BlogArticleProps) => {
  const theme = useTheme();
  const minRead = readingTime(content);
  const { t } = useTranslation();
  const location = useLocation();

  const handleShareClick = () => {
    navigator.clipboard.writeText(
      `${window.location.host}${location.pathname}`,
    );
  };

  const handleTwitterClick = () => {
    const xUrl = new URL(X_SHARE_URL);
    xUrl.searchParams.set('url', `${window.location.host}${location.pathname}`);
    xUrl.searchParams.set('title', title);
    openInNewTab(xUrl.href);
  };

  const handleFbClick = () => {
    const fbUrl = new URL(FB_SHARE_URL);
    fbUrl.searchParams.set('u', `${window.location.host}${location.pathname}`);
    fbUrl.searchParams.set('title', title);
    openInNewTab(fbUrl.href);
  };

  const handleLinkedInClick = () => {
    const linkedInUrl = new URL(LINKEDIN_SHARE_URL);
    linkedInUrl.searchParams.set('mini', 'true');
    linkedInUrl.searchParams.set(
      'url',
      `${window.location.host}${location.pathname}`,
    );
    linkedInUrl.searchParams.set('title', title);
    openInNewTab(linkedInUrl.href);
  };

  // Ensure that articles and article are defined before using them
  const customRichBlocks = {
    // You can use the default components to set class names...
    paragraph: ({ children }: any) => {
      console.log('children', children);
      if (children[0].props.text.includes('<JUMPER_BANNER>')) {
        return <JumperBanner />;
      } else {
        return <p className="text-neutral900 max-w-prose">{children}</p>;
      }
    },
  };
  console.log('AUTHOR', author);
  return title ? (
    <>
      <BlogArticleContainer>
        <Typography
          variant="lifiBodyXSmall"
          component="span"
          color={
            theme.palette.mode === 'light'
              ? theme.palette.grey[800]
              : theme.palette.grey[300]
          }
          sx={{
            '&:after': {
              content: '"•"',
              margin: '0 4px',
            },
          }}
        >
          {formatDate(publishedAt || createdAt)}
        </Typography>
        <Typography
          variant="lifiBodyXSmall"
          component="span"
          mt={theme.spacing(1)}
          color={
            theme.palette.mode === 'light'
              ? theme.palette.grey[800]
              : theme.palette.grey[300]
          }
        >
          {t('blog.minRead', { minRead: minRead })}
        </Typography>
        <Typography variant="lifiHeaderLarge">{title}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: theme.spacing(1),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BlogAuthorAvatar
              src={`${baseUrl}${author.data.attributes.Avatar.data.attributes.url}`}
              alt="author-avatar"
            />
            <Typography
              variant="lifiBodyXSmallStrong"
              component="span"
              color={
                theme.palette.mode === 'light'
                  ? theme.palette.grey[800]
                  : theme.palette.grey[300]
              }
            >
              {author.data.attributes.Name}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip
              title={'Share article on LinkedIn'}
              key={`tooltip-share-linkedin`}
              placement="top"
              enterTouchDelay={0}
              arrow
            >
              <IconButton
                onClick={handleLinkedInClick}
                sx={{
                  marginLeft: 0.5,
                  width: '40px',
                  height: '40px',
                  color:
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[300],
                }}
              >
                <LinkedInIcon sx={{ width: '18px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={'Share article on Facebook'}
              key={`tooltip-share-facebook`}
              placement="top"
              enterTouchDelay={0}
              arrow
            >
              <IconButton
                onClick={handleFbClick}
                sx={{
                  marginLeft: 0.5,
                  width: '40px',
                  height: '40px',
                  color:
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[300],
                }}
              >
                <FacebookIcon sx={{ width: '18px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={'Share article on X'}
              key={`tooltip-share-x`}
              placement="top"
              enterTouchDelay={0}
              arrow
            >
              <IconButton
                onClick={handleTwitterClick}
                sx={{
                  marginLeft: 0.5,
                  width: '40px',
                  height: '40px',
                  color:
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[300],
                }}
              >
                <XIcon sx={{ width: '18px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={'Share the link'}
              key={`tooltip-share-link`}
              placement="top"
              enterTouchDelay={0}
              arrow
            >
              <IconButton
                onClick={handleShareClick}
                sx={{
                  marginLeft: 0.5,
                  width: '40px',
                  height: '40px',
                  color:
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[300],
                }}
              >
                <ShareIcon sx={{ width: '18px' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <BlogArticleImage
          src={`${baseUrl}${image.data.attributes.url}`}
          alt={image.data.attributes.alternativeText}
        />
        <BlogArticleContentContainer>
          <Typography variant="lifiHeaderMedium">{subtitle}</Typography>
          <BlocksRenderer content={content} blocks={customRichBlocks} />
          <Divider
            sx={{
              borderColor:
                theme.palette.mode === 'light'
                  ? theme.palette.grey[300]
                  : theme.palette.grey[800],
              margin: theme.spacing(4, 0),
            }}
          ></Divider>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              img: { width: '28px' },
              padding: theme.spacing(0.5),
              paddingRight: theme.spacing(1.5),
              width: 'fit-content',
              borderRadius: '20px',
            }}
          >
            <BlogAuthorAvatar
              src={`${baseUrl}${author.data.attributes.Avatar.data.attributes.url}`}
              alt="author-avatar"
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="lifiBodyXSmallStrong"
                component="span"
                color={
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[800]
                    : theme.palette.grey[300]
                }
              >
                {author.data.attributes.Name}
              </Typography>
              <Typography
                variant="lifiBodyXSmall"
                component="span"
                color={
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[800]
                    : theme.palette.grey[300]
                }
              >
                {author.data.attributes.Role}
              </Typography>
            </Box>
          </Box>
        </BlogArticleContentContainer>
      </BlogArticleContainer>
      <ArticleJsonSchema
        title={title}
        images={[`${baseUrl}${image.data.attributes.url}`]}
        datePublished={publishedAt || createdAt}
        dateModified={updatedAt || createdAt}
        authorName={author.data.attributes.Name}
      />
    </>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
};