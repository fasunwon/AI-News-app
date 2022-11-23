import React, {useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers'
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles'
const botKey ='83fa741641acfe27f465deb5821146082e956eca572e1d8b807a3e2338fdd0dc/stage'
const App = () => {
    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();
    useEffect(()=>{
        alanBtn({
            key:botKey,
            onCommand:({command, articles, number})=>{
                if(command === 'newHeadlines'){
                    setNewsArticles(articles)
                    setActiveArticle(-1)
                }else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle + 1)
                } else if(command === 'open'){
                    const parsedNum = number.length > 2? wordsToNumbers(number, {fuzzy:true}): number;
                    const article = articles[parsedNum -1];
                    if(parsedNum > 20){
                        alanBtn().playText('Dont get what u saying man, try again')
                    }else if(article){
                        window.open(article.url, '_blank')
                    }
                }
            }
        })
    },[])
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Wikinews-breaking-news.svg/1280px-Wikinews-breaking-news.svg.png" 
                className={classes.alanLogo} alt="Home Page Logo"
                onClick={()=>window.location.reload()}/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}
export default App;
