import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  BackHandler,
  Animated,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import {CustomButton} from '../../components/CustomButton';
import {useFocusEffect} from '@react-navigation/native';
import {BackIcon, ArrowRight} from '../../components/icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HairQuiz'>;

interface QuizOption {
  text: string;
  value: string;
  description?: string;
  image?: any; // Add proper image type based on your assets
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  helpText?: string;
}

// Hair analysis result interface
interface HairAnalysisResult {
  hairType: string;
  porosity: string;
  density: string;
  thickness: string;
  elasticity: string;
  scalpCondition: string;
  productCompatibility: string;
  maintenanceLevel: string;
  recommendedProducts: string[];
  recommendedRoutine: string[];
  careInstructions: string[];
}

const hairQuizQuestions: QuizQuestion[] = [
  {
    id: 'pattern',
    question:
      'When your hair is completely dry and product-free, what pattern do you observe?',
    helpText:
      'Look at your hair in its natural state without any styling products or manipulation.',
    options: [
      {
        text: 'Straight with no bend or curl',
        value: 'straight',
        description: 'Hair falls straight down with no natural curve',
        image: require('../../assets/images/hair-types/straight.png'),
      },
      {
        text: 'Slight wave, S-shaped pattern',
        value: 'wavy',
        description: 'Forms a loose "S" shape throughout the length',
        image: require('../../assets/images/hair-types/wavy.png'),
      },
      {
        text: 'Defined curls, spiral pattern',
        value: 'curly',
        description: 'Forms springy, well-defined curls',
        image: require('../../assets/images/hair-types/curly.png'),
      },
      {
        text: 'Tight coils or zigzag pattern',
        value: 'coily',
        description: 'Very tight curls forming a zigzag pattern',
        image: require('../../assets/images/hair-types/coily.png'),
      },
    ],
  },
  {
    id: 'curl_diameter',
    question:
      'If your hair has curls or waves, what is the approximate diameter?',
    helpText:
      'Look at a single curl or wave and estimate its width at the widest point.',
    options: [
      {
        text: 'No curls (straight hair)',
        value: 'none',
        description: 'My hair is completely straight',
      },
      {
        text: 'Wide waves (> 2 inches)',
        value: '2a',
        description:
          'Loose, barely-there waves with an "S" shape wider than 2 inches',
      },
      {
        text: 'Medium waves (1-2 inches)',
        value: '2b',
        description: 'Defined "S" waves that are 1-2 inches wide',
      },
      {
        text: 'Tight waves (< 1 inch)',
        value: '2c',
        description: 'Well-defined "S" waves that are less than 1 inch wide',
      },
      {
        text: 'Wide curls (> 1 inch)',
        value: '3a',
        description: 'Loose, springy curls with a diameter larger than 1 inch',
      },
      {
        text: 'Medium curls (pencil-sized)',
        value: '3b',
        description:
          'Springy, defined curls about the width of a marker or pencil',
      },
      {
        text: 'Tight curls (straw-sized)',
        value: '3c',
        description:
          'Densely packed, tight curls about the width of a drinking straw',
      },
      {
        text: 'Wide coils (coffee stirrer)',
        value: '4a',
        description:
          'Tightly coiled strands with a visible "S" pattern when stretched',
      },
      {
        text: 'Tight coils (spring-like)',
        value: '4b',
        description:
          'Densely packed, "Z" pattern coils that form a spring-like shape',
      },
      {
        text: 'Very tight coils (zigzag)',
        value: '4c',
        description:
          'Extremely tight coils with less definition and a zigzag pattern',
      },
    ],
  },
  {
    id: 'porosity',
    question: 'How does your hair react to water?',
    helpText:
      'Porosity determines how well your hair absorbs and retains moisture, affecting product selection and styling methods.',
    options: [
      {
        text: 'Takes a long time to get wet and dry',
        value: 'low_porosity',
        description:
          'Water beads on hair before absorbing; products sit on hair; resistant to chemical treatments',
      },
      {
        text: 'Gets wet easily and takes average time to dry',
        value: 'medium_porosity',
        description:
          'Balanced moisture absorption and retention; accepts color treatments well',
      },
      {
        text: 'Absorbs water quickly but dries very fast',
        value: 'high_porosity',
        description:
          'Quickly absorbs water but loses moisture easily; may feel dry or frizzy; often damaged',
      },
    ],
  },
  {
    id: 'float_test',
    question: 'If you place a clean strand of hair in water, what happens?',
    helpText:
      'This is the scientific float test for porosity. Take a clean strand and place it in a glass of water.',
    options: [
      {
        text: 'Floats for a long time',
        value: 'low_porosity_confirmed',
        description:
          'Hair cuticles are tightly closed, preventing water absorption',
      },
      {
        text: 'Floats briefly then sinks',
        value: 'medium_porosity_confirmed',
        description:
          'Hair cuticles are partially open, allowing balanced moisture exchange',
      },
      {
        text: 'Sinks immediately',
        value: 'high_porosity_confirmed',
        description:
          'Hair cuticles are very open, allowing rapid water absorption',
      },
      {
        text: "Haven't tried this test",
        value: 'unknown',
        description: "Skip this question if you haven't performed the test",
      },
    ],
  },
  {
    id: 'density',
    question:
      "When you gather your hair in a ponytail, what's the circumference compared to a coin?",
    helpText:
      'Hair density refers to how many strands you have per square inch of scalp, affecting fullness and styling needs.',
    options: [
      {
        text: 'Thinner than a quarter',
        value: 'low_density',
        description:
          'Scalp is easily visible through hair; ponytail feels thin',
      },
      {
        text: 'About the size of a quarter',
        value: 'medium_density',
        description: 'Scalp is partially visible; average ponytail thickness',
      },
      {
        text: 'Thicker than a quarter',
        value: 'high_density',
        description: 'Scalp is barely visible; ponytail feels thick and full',
      },
    ],
  },
  {
    id: 'thickness',
    question: 'Compare a single strand of hair to a sewing thread:',
    helpText:
      'Hair thickness (or width) refers to the diameter of individual strands, not the overall amount of hair.',
    options: [
      {
        text: 'Much thinner than thread',
        value: 'fine',
        description:
          'Individual strands are barely visible; hair feels silky and may lack volume',
      },
      {
        text: 'Similar to thread',
        value: 'medium',
        description:
          'Individual strands are visible but not thick; balanced texture',
      },
      {
        text: 'Thicker than thread',
        value: 'coarse',
        description:
          'Individual strands are thick and strong; hair may feel rough or wiry',
      },
    ],
  },
  {
    id: 'elasticity',
    question: 'When you stretch a wet hair strand, what happens?',
    helpText:
      'Elasticity indicates hair health and protein/moisture balance. Gently pull a wet strand and observe.',
    options: [
      {
        text: 'Breaks immediately',
        value: 'low_elasticity',
        description:
          'Hair lacks stretch and snaps easily; may indicate protein overload or damage',
      },
      {
        text: 'Stretches a bit before breaking',
        value: 'medium_elasticity',
        description:
          'Hair stretches somewhat and returns to shape; balanced protein/moisture',
      },
      {
        text: 'Stretches significantly and returns to shape',
        value: 'high_elasticity',
        description:
          'Hair stretches well without breaking; indicates healthy, well-moisturized hair',
      },
    ],
  },
  {
    id: 'scalp_condition',
    question: 'How would you describe your scalp condition?',
    helpText:
      'Scalp health directly impacts hair growth and overall hair health.',
    options: [
      {
        text: 'Dry and flaky',
        value: 'dry_scalp',
        description:
          'Feels tight, itchy, with visible flakes; may need hydrating treatments',
      },
      {
        text: 'Oily, especially at roots',
        value: 'oily_scalp',
        description:
          'Becomes greasy quickly after washing; may need clarifying products',
      },
      {
        text: 'Balanced, rarely problematic',
        value: 'balanced_scalp',
        description: 'Neither too dry nor too oily; comfortable between washes',
      },
      {
        text: 'Combination (oily roots, dry ends)',
        value: 'combination_scalp',
        description:
          'Oily at the scalp but dry at the ends; requires targeted care',
      },
      {
        text: 'Sensitive or irritated',
        value: 'sensitive_scalp',
        description:
          'Prone to irritation, redness, or discomfort; may need gentle products',
      },
    ],
  },
  {
    id: 'product_buildup',
    question: 'How does your hair respond to product application?',
    helpText:
      'This helps determine if your hair is prone to buildup, which affects product selection.',
    options: [
      {
        text: 'Products sit on top and feel heavy',
        value: 'buildup_prone',
        description:
          'Hair feels weighed down easily; may need regular clarifying',
      },
      {
        text: 'Absorbs products well without residue',
        value: 'balanced_absorption',
        description:
          'Products are absorbed appropriately without buildup or dryness',
      },
      {
        text: 'Seems to "drink up" products quickly',
        value: 'high_absorption',
        description:
          'Hair absorbs products rapidly and may need frequent reapplication',
      },
    ],
  },
  {
    id: 'color_treatment',
    question: 'Have you chemically treated your hair in the past year?',
    helpText:
      'Chemical treatments affect porosity, strength, and product needs.',
    options: [
      {
        text: 'No chemical treatments',
        value: 'virgin_hair',
        description:
          'Hair has not been colored, permed, relaxed, or chemically treated',
      },
      {
        text: 'Color-treated only',
        value: 'color_treated',
        description: 'Hair has been dyed but not structurally altered',
      },
      {
        text: 'Bleached or highlighted',
        value: 'bleached',
        description:
          'Hair has been lightened, which increases porosity and potential damage',
      },
      {
        text: 'Chemically straightened/relaxed',
        value: 'relaxed',
        description:
          'Hair structure has been permanently altered to be straighter',
      },
      {
        text: 'Permed or curled',
        value: 'permed',
        description:
          'Hair structure has been permanently altered to be curlier',
      },
      {
        text: 'Multiple treatments',
        value: 'multiple_treatments',
        description: 'Hair has undergone several different chemical processes',
      },
    ],
  },
  {
    id: 'frizz_tendency',
    question: 'How does your hair react to humidity?',
    helpText:
      'Frizz tendency indicates cuticle condition and moisture balance needs.',
    options: [
      {
        text: 'Minimal change, stays smooth',
        value: 'frizz_resistant',
        description:
          'Hair maintains its style regardless of weather conditions',
      },
      {
        text: 'Slight frizz in high humidity',
        value: 'moderate_frizz',
        description: 'Some flyaways or texture changes in humid conditions',
      },
      {
        text: 'Significant frizz and volume increase',
        value: 'high_frizz',
        description:
          'Hair expands and becomes unmanageable in humid conditions',
      },
    ],
  },
];

const HairQuizScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [loadingMessage, setLoadingMessage] = useState(
    'Analyzing your hair profile...',
  );
  const currentQuestion = hairQuizQuestions[currentQuestionIndex];

  // Initialize currentSelection when changing questions
  useEffect(() => {
    if (currentQuestion) {
      setCurrentSelection(answers[currentQuestion.id] || null);
    }
  }, [currentQuestionIndex, answers, currentQuestion]);

  // Start pulsating animation for loading screen
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();

      // Change loading message every second
      const messages = [
        'Analyzing your hair profile...',
        'Determining your hair type...',
        'Calculating product recommendations...',
        'Finalizing your personalized hair care plan...',
      ];

      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        setLoadingMessage(messages[messageIndex]);
      }, 1000);

      return () => {
        clearInterval(messageInterval);
      };
    }
  }, [isLoading, pulseAnim]);

  const animateTransition = useCallback(
    (forward: boolean = true) => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: forward ? -50 : 50,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (forward) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setCurrentQuestionIndex(prev => prev - 1);
        }
        slideAnim.setValue(forward ? 50 : -50);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      });
    },
    [fadeAnim, slideAnim],
  );

  // Handle back button press
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isLoading) {
          // Prevent going back during loading
          return true;
        }

        if (currentQuestionIndex > 0) {
          animateTransition(false);
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [currentQuestionIndex, animateTransition, isLoading]),
  );

  const handleOptionSelect = (value: string) => {
    setCurrentSelection(value);
  };

  // Analyze hair based on quiz answers
  const analyzeHairType = (
    answers: Record<string, string>,
  ): HairAnalysisResult => {
    // Default values
    let result: HairAnalysisResult = {
      hairType: '3B',
      porosity: 'Medium',
      density: 'Medium',
      thickness: 'Medium',
      elasticity: 'Medium',
      scalpCondition: 'Balanced',
      productCompatibility: 'Normal',
      maintenanceLevel: 'Moderate',
      recommendedProducts: [],
      recommendedRoutine: [],
      careInstructions: [],
    };

    // Determine hair type based on pattern and curl diameter
    if (answers.pattern === 'straight') {
      result.hairType = '1';
    } else if (answers.pattern === 'wavy') {
      if (answers.curl_diameter === '2a') result.hairType = '2A';
      else if (answers.curl_diameter === '2b') result.hairType = '2B';
      else if (answers.curl_diameter === '2c') result.hairType = '2C';
      else result.hairType = '2B'; // Default wavy
    } else if (answers.pattern === 'curly') {
      if (answers.curl_diameter === '3a') result.hairType = '3A';
      else if (answers.curl_diameter === '3b') result.hairType = '3B';
      else if (answers.curl_diameter === '3c') result.hairType = '3C';
      else result.hairType = '3B'; // Default curly
    } else if (answers.pattern === 'coily') {
      if (answers.curl_diameter === '4a') result.hairType = '4A';
      else if (answers.curl_diameter === '4b') result.hairType = '4B';
      else if (answers.curl_diameter === '4c') result.hairType = '4C';
      else result.hairType = '4B'; // Default coily
    }

    // Determine porosity
    // First check float test if available
    if (answers.float_test === 'low_porosity_confirmed') {
      result.porosity = 'Low';
    } else if (answers.float_test === 'medium_porosity_confirmed') {
      result.porosity = 'Medium';
    } else if (answers.float_test === 'high_porosity_confirmed') {
      result.porosity = 'High';
    } else {
      // Fall back to water reaction question
      if (answers.porosity === 'low_porosity') {
        result.porosity = 'Low';
      } else if (answers.porosity === 'medium_porosity') {
        result.porosity = 'Medium';
      } else if (answers.porosity === 'high_porosity') {
        result.porosity = 'High';
      }
    }

    // Determine density
    if (answers.density === 'low_density') {
      result.density = 'Low';
    } else if (answers.density === 'medium_density') {
      result.density = 'Medium';
    } else if (answers.density === 'high_density') {
      result.density = 'High';
    }

    // Determine thickness
    if (answers.thickness === 'fine') {
      result.thickness = 'Fine';
    } else if (answers.thickness === 'medium') {
      result.thickness = 'Medium';
    } else if (answers.thickness === 'coarse') {
      result.thickness = 'Coarse';
    }

    // Determine elasticity
    if (answers.elasticity === 'low_elasticity') {
      result.elasticity = 'Low';
    } else if (answers.elasticity === 'medium_elasticity') {
      result.elasticity = 'Medium';
    } else if (answers.elasticity === 'high_elasticity') {
      result.elasticity = 'High';
    }

    // Determine scalp condition
    if (answers.scalp_condition) {
      if (answers.scalp_condition === 'dry_scalp') {
        result.scalpCondition = 'Dry';
      } else if (answers.scalp_condition === 'oily_scalp') {
        result.scalpCondition = 'Oily';
      } else if (answers.scalp_condition === 'balanced_scalp') {
        result.scalpCondition = 'Balanced';
      } else if (answers.scalp_condition === 'combination_scalp') {
        result.scalpCondition = 'Combination';
      } else if (answers.scalp_condition === 'sensitive_scalp') {
        result.scalpCondition = 'Sensitive';
      }
    }

    // Determine product compatibility
    if (answers.product_buildup === 'buildup_prone') {
      result.productCompatibility = 'Buildup Prone';
    } else if (answers.product_buildup === 'balanced_absorption') {
      result.productCompatibility = 'Normal';
    } else if (answers.product_buildup === 'high_absorption') {
      result.productCompatibility = 'High Absorption';
    }

    // Determine maintenance level based on multiple factors
    const maintenanceFactors = {
      hairType: {
        '1': 1, // Straight - lowest maintenance
        '2A': 2,
        '2B': 2,
        '2C': 3, // Wavy - low to medium
        '3A': 3,
        '3B': 4,
        '3C': 4, // Curly - medium to high
        '4A': 4,
        '4B': 5,
        '4C': 5, // Coily - highest maintenance
      },
      porosity: {
        Low: 4, // Harder to moisturize
        Medium: 2, // Balanced
        High: 3, // Needs more sealing
      } as Record<string, number>,
      density: {
        Low: 2,
        Medium: 3,
        High: 4, // More hair = more work
      } as Record<string, number>,
      thickness: {
        Fine: 2,
        Medium: 3,
        Coarse: 4, // Coarse hair often needs more management
      } as Record<string, number>,
    };

    // Calculate maintenance score
    let maintenanceScore = 0;
    maintenanceScore +=
      maintenanceFactors.hairType[
        result.hairType as keyof typeof maintenanceFactors.hairType
      ] || 3;
    maintenanceScore += maintenanceFactors.porosity[result.porosity] || 2;
    maintenanceScore += maintenanceFactors.density[result.density] || 3;
    maintenanceScore += maintenanceFactors.thickness[result.thickness] || 3;

    // Determine maintenance level
    if (maintenanceScore <= 8) {
      result.maintenanceLevel = 'Low';
    } else if (maintenanceScore <= 12) {
      result.maintenanceLevel = 'Moderate';
    } else {
      result.maintenanceLevel = 'High';
    }

    // Generate recommended products based on hair characteristics
    result.recommendedProducts = generateRecommendedProducts(result);

    // Generate recommended routine
    result.recommendedRoutine = generateRecommendedRoutine(result);

    // Generate care instructions
    result.careInstructions = generateCareInstructions(result);

    return result;
  };

  // Generate product recommendations based on hair analysis
  const generateRecommendedProducts = (
    analysis: HairAnalysisResult,
  ): string[] => {
    const products: string[] = [];

    // Cleansing recommendations
    if (analysis.porosity === 'Low') {
      products.push('Clarifying shampoo (bi-weekly)');
      products.push('Lightweight co-wash');
    } else if (analysis.porosity === 'Medium') {
      products.push('Sulfate-free shampoo');
      products.push('Moisturizing co-wash');
    } else if (analysis.porosity === 'High') {
      products.push('Hydrating, sulfate-free shampoo');
      products.push('Cream-based co-wash');
    }

    // Conditioning recommendations
    if (
      analysis.hairType.startsWith('1') ||
      analysis.hairType.startsWith('2')
    ) {
      products.push('Lightweight conditioner');
    } else if (analysis.hairType.startsWith('3')) {
      products.push('Moisturizing conditioner');
      products.push('Leave-in conditioner');
    } else if (analysis.hairType.startsWith('4')) {
      products.push('Deep conditioner');
      products.push('Heavy leave-in conditioner');
    }

    // Styling recommendations
    if (analysis.hairType.startsWith('1')) {
      products.push('Volumizing mousse');
    } else if (analysis.hairType.startsWith('2')) {
      products.push('Curl enhancing cream');
      products.push('Lightweight gel');
    } else if (analysis.hairType.startsWith('3')) {
      products.push('Curl defining cream');
      products.push('Medium-hold gel');
    } else if (analysis.hairType.startsWith('4')) {
      products.push('Curl defining butter or cream');
      products.push('Edge control');
      products.push('Strong-hold gel');
    }

    // Treatment recommendations
    if (analysis.elasticity === 'Low') {
      products.push('Protein treatment');
    }

    if (analysis.scalpCondition === 'Dry') {
      products.push('Scalp oil treatment');
    } else if (analysis.scalpCondition === 'Oily') {
      products.push('Scalp exfoliator');
    } else if (analysis.scalpCondition === 'Sensitive') {
      products.push('Fragrance-free scalp treatment');
    }

    return products;
  };

  // Generate recommended routine based on hair analysis
  const generateRecommendedRoutine = (
    analysis: HairAnalysisResult,
  ): string[] => {
    const routine: string[] = [];

    // Washing frequency
    if (analysis.scalpCondition === 'Oily') {
      routine.push('Wash 2-3 times per week');
    } else if (
      analysis.hairType.startsWith('1') ||
      analysis.hairType.startsWith('2')
    ) {
      routine.push('Wash every 2-3 days');
    } else if (analysis.hairType.startsWith('3')) {
      routine.push('Wash 1-2 times per week');
    } else if (analysis.hairType.startsWith('4')) {
      routine.push('Wash once per week');
    }

    // Deep conditioning
    if (analysis.porosity === 'High' || analysis.hairType.startsWith('4')) {
      routine.push('Deep condition weekly');
    } else {
      routine.push('Deep condition bi-weekly');
    }

    // Protein treatments
    if (analysis.elasticity === 'Low') {
      routine.push('Protein treatment every 4-6 weeks');
    } else {
      routine.push('Protein treatment every 8-12 weeks');
    }

    // Detangling
    if (
      analysis.hairType.startsWith('3') ||
      analysis.hairType.startsWith('4')
    ) {
      routine.push('Detangle with conditioner using wide-tooth comb');
    }

    // Styling
    if (
      analysis.hairType.startsWith('2') ||
      analysis.hairType.startsWith('3') ||
      analysis.hairType.startsWith('4')
    ) {
      routine.push('Style on wet or damp hair');
    }

    // Drying
    if (analysis.porosity === 'Low') {
      routine.push('Use heat to help open cuticles when deep conditioning');
    } else if (analysis.porosity === 'High') {
      routine.push('Avoid excessive heat');
    }

    return routine;
  };

  // Generate care instructions based on hair analysis
  const generateCareInstructions = (analysis: HairAnalysisResult): string[] => {
    const instructions: string[] = [];

    // Nighttime care
    if (
      analysis.hairType.startsWith('2') ||
      analysis.hairType.startsWith('3') ||
      analysis.hairType.startsWith('4')
    ) {
      instructions.push('Sleep with a satin/silk bonnet or pillowcase');
    }

    // Moisture retention
    if (analysis.porosity === 'High') {
      instructions.push(
        'Seal moisture with oils or butters after conditioning',
      );
    }

    // Protection
    if (
      analysis.hairType.startsWith('3') ||
      analysis.hairType.startsWith('4')
    ) {
      instructions.push('Consider protective styling to reduce manipulation');
    }

    // Trimming
    instructions.push('Trim ends every 8-12 weeks to prevent split ends');

    // Heat styling
    if (analysis.porosity === 'High' || analysis.elasticity === 'Low') {
      instructions.push('Minimize heat styling to prevent further damage');
    } else {
      instructions.push('Always use heat protectant before heat styling');
    }

    return instructions;
  };

  const handleConfirm = () => {
    if (!currentSelection) {
      Alert.alert(
        'No Selection',
        'Please select an option before continuing.',
        [{text: 'OK', onPress: () => {}}],
      );
      return;
    }

    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: currentSelection,
    }));

    // Check if this is the last question
    if (currentQuestionIndex < hairQuizQuestions.length - 1) {
      animateTransition(true);
    } else {
      // Validate that all questions are answered
      const updatedAnswers = {
        ...answers,
        [currentQuestion.id]: currentSelection,
      };

      const allQuestionsAnswered = hairQuizQuestions.every(
        question => updatedAnswers[question.id],
      );

      if (!allQuestionsAnswered) {
        Alert.alert(
          'Incomplete Quiz',
          'Please answer all questions before proceeding.',
          [{text: 'OK', onPress: () => {}}],
        );
        return;
      }

      // Show loading screen
      setIsLoading(true);

      // Analyze hair type based on answers
      const hairAnalysis = analyzeHairType(updatedAnswers);

      // Navigate to results after 3 seconds
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('Results', {
          hairType: hairAnalysis.hairType,
          porosity: hairAnalysis.porosity,
          density: hairAnalysis.density,
          thickness: hairAnalysis.thickness,
          elasticity: hairAnalysis.elasticity,
          scalpCondition: hairAnalysis.scalpCondition,
          productCompatibility: hairAnalysis.productCompatibility,
          maintenanceLevel: hairAnalysis.maintenanceLevel,
          recommendedProducts: hairAnalysis.recommendedProducts,
          recommendedRoutine: hairAnalysis.recommendedRoutine,
          careInstructions: hairAnalysis.careInstructions,
        });
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      animateTransition(false);
    } else {
      Alert.alert(
        'Exit Quiz',
        'Are you sure you want to exit the quiz? Your progress will be lost.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }
  };

  const renderQuestionHelp = () => {
    if (!currentQuestion.helpText) return null;
    return (
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => setShowHelp(!showHelp)}
        accessibilityLabel="Toggle help information"
        accessibilityHint="Shows additional information about the current question"
        accessibilityRole="button">
        <Text style={styles.helpButtonText}>ⓘ</Text>
        {showHelp && (
          <View style={styles.helpContent}>
            <View style={styles.helpContentHeader}>
              <Text style={styles.helpContentTitle}>Help</Text>
              <TouchableOpacity
                onPress={() => setShowHelp(false)}
                accessibilityLabel="Close help"
                accessibilityRole="button">
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.helpText}>{currentQuestion.helpText}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderOption = (option: QuizOption, index: number) => {
    const isSelected = currentSelection === option.value;
    const isImageOnly = option.image && !option.description;

    return (
      <View
        key={index}
        style={[styles.optionWrapper, isSelected && styles.optionSelected]}>
        <TouchableOpacity
          style={styles.optionTouchable}
          onPress={() => handleOptionSelect(option.value)}
          accessibilityLabel={option.text}
          accessibilityHint={`Select ${option.text} as your answer`}
          accessibilityRole="radio"
          accessibilityState={{checked: isSelected}}>
          <View style={styles.optionContent}>
            <Text
              style={[
                styles.optionTitle,
                isSelected && styles.optionTitleSelected,
              ]}>
              {option.text}
            </Text>
            {option.description && (
              <Text style={styles.optionDescription}>{option.description}</Text>
            )}
          </View>
          {option.image && !isImageOnly && (
            <Image
              source={option.image}
              style={styles.optionImage}
              resizeMode="cover"
            />
          )}
          <View
            style={[styles.checkmark, isSelected && styles.checkmarkSelected]}>
            {isSelected && <Text style={styles.checkmarkInner}>✓</Text>}
          </View>
        </TouchableOpacity>
        {option.image && isImageOnly && (
          <Image
            source={option.image}
            style={styles.optionImageLarge}
            resizeMode="cover"
          />
        )}
      </View>
    );
  };

  const getConfirmButtonStyle = () => {
    const baseStyle = styles.confirmButton;
    if (!currentSelection) {
      return {
        ...baseStyle,
        backgroundColor: '#CCCCCC',
      };
    }
    return baseStyle;
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View
          style={styles.loadingContainer}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Loading screen"
          accessibilityHint="Please wait while we analyze your hair profile">
          <Animated.View
            style={{
              transform: [{scale: pulseAnim}],
            }}
            accessible={false}>
            <ActivityIndicator
              size="large"
              color="#8D6E63"
              accessibilityLabel="Loading indicator"
            />
          </Animated.View>
          <Text style={styles.loadingText} accessibilityLabel={loadingMessage}>
            {loadingMessage}
          </Text>
          <Text
            style={styles.loadingSubText}
            accessibilityLabel="This will only take a moment">
            This will only take a moment...
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <CustomButton
              onPress={handleBack}
              title="Back"
              icon={<BackIcon size={20} color="#8D6E63" />}
              iconPosition="left"
              style={styles.backButton}
              textStyle={styles.backButtonText}
              accessibilityLabel="Go back"
              accessibilityHint={
                currentQuestionIndex > 0
                  ? 'Return to previous question'
                  : 'Exit quiz'
              }
            />
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Question {currentQuestionIndex + 1} of{' '}
                {hairQuizQuestions.length}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        ((currentQuestionIndex + 1) /
                          hairQuizQuestions.length) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
            </View>
            {renderQuestionHelp()}
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <Animated.View
              style={[
                styles.questionContainer,
                {
                  opacity: fadeAnim,
                  transform: [{translateX: slideAnim}],
                },
              ]}>
              <Text style={styles.questionText}>
                {currentQuestion.question}
              </Text>

              <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) =>
                  renderOption(option, index),
                )}
              </View>

              <View style={styles.confirmButtonContainer}>
                <CustomButton
                  onPress={handleConfirm}
                  title={
                    currentQuestionIndex === hairQuizQuestions.length - 1
                      ? 'Finish'
                      : 'Next'
                  }
                  icon={<ArrowRight size={20} color="#FFFFFF" />}
                  style={getConfirmButtonStyle()}
                  textStyle={styles.confirmButtonText}
                  accessibilityLabel={
                    currentQuestionIndex === hairQuizQuestions.length - 1
                      ? 'Finish quiz'
                      : 'Next question'
                  }
                  accessibilityHint="Confirm your selection and continue"
                />
              </View>
            </Animated.View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5E6E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    padding: 8,
  },
  backButtonText: {
    color: '#8D6E63',
    fontSize: 16,
  },
  helpButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: 'rgba(98, 0, 238, 0.2)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 999,
  },
  helpButtonText: {
    fontSize: 18,
    color: '#8D6E63',
    fontWeight: '600',
  },
  helpContent: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    width: 250,
    zIndex: 9999,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  helpText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    fontWeight: '400',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
    color: '#666666',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8D6E63',
    borderRadius: 3,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  optionsContainer: {
    gap: 16,
    paddingBottom: 24,
  },
  optionWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  optionTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  optionSelected: {
    backgroundColor: '#F5E6E0',
    borderWidth: 2,
    borderColor: '#8D6E63',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  optionTitleSelected: {
    color: '#8D6E63',
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  optionImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  optionImageLarge: {
    width: '100%',
    height: 160,
    marginTop: 12,
    borderRadius: 8,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8D6E63',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkmarkSelected: {
    backgroundColor: '#8D6E63',
  },
  checkmarkInner: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButtonContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  confirmButton: {
    backgroundColor: '#8D6E63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  helpContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  helpContentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8D6E63',
  },
  closeButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8D6E63',
    padding: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
    color: '#8D6E63',
    textAlign: 'center',
  },
  loadingSubText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default HairQuizScreen;
